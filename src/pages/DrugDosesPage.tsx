import { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap'
import { useSearchParams } from 'react-router-dom'
import DoseFilter from '../components/DoseFilter'
import DrugDoseTile from '../components/DrugDoseTile'
import { ADULT_DOSE_MAX, ADULT_DOSE_MIN, DRUG_DOSES_MOCK } from '../modules/mock'
import type { DrugDose } from '../types'

const DrugDosesPage = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const [drugDoses, setDrugDoses] = useState<DrugDose[]>([])
    const [isLoading, setIsLoading] = useState(true)

    const minAdultDose = Number(searchParams.get('min_adult_dose') ?? ADULT_DOSE_MIN)
    const maxAdultDose = Number(searchParams.get('max_adult_dose') ?? ADULT_DOSE_MAX)

    useEffect(() => {
        setIsLoading(true)

        const timer = setTimeout(() => {
            setDrugDoses(
                DRUG_DOSES_MOCK.filter(
                    (drugDose) =>
                        drugDose.recommended_adult_dose_mg >= minAdultDose &&
                        drugDose.recommended_adult_dose_mg <= maxAdultDose,
                ),
            )
            setIsLoading(false)
        }, 300)

        return () => clearTimeout(timer)
    }, [minAdultDose, maxAdultDose])

    useEffect(() => {
        document.title = 'Плитка доз препаратов'
    }, [])

    const handleApply = (nextMinAdultDose: number, nextMaxAdultDose: number) => {
        setSearchParams({
            min_adult_dose: String(nextMinAdultDose),
            max_adult_dose: String(nextMaxAdultDose),
        })
    }

    return (
        <div className="screen">
            <header className="screen-header">
                <h1 className="screen-title">Плитка доз препаратов</h1>
                <p className="screen-subtitle">Рекомендованные дозировки для взрослых</p>
            </header>

            <DoseFilter minAdultDose={minAdultDose} maxAdultDose={maxAdultDose} onApply={handleApply} />

            {isLoading && (
                <div className="screen-loader">
                    <Spinner animation="border" role="status" variant="primary" />
                </div>
            )}

            {!isLoading && drugDoses.length > 0 && (
                <div className="drug-grid">
                    {drugDoses.map((drugDose) => (
                        <DrugDoseTile key={drugDose.id} drugDose={drugDose} />
                    ))}
                </div>
            )}

            {!isLoading && drugDoses.length === 0 && (
                <p className="empty-note">Дозы препаратов с такой дозировкой не найдены</p>
            )}
        </div>
    )
}

export default DrugDosesPage
