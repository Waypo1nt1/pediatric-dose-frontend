import { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap'
import DoseFilter from '../components/DoseFilter'
import DrugDoseTile from '../components/DrugDoseTile'
import { ADULT_DOSE_MAX, ADULT_DOSE_MIN, DRUG_DOSES_MOCK } from '../modules/mock'
import type { DrugDose } from '../types'

const DrugDosesPage = () => {
    const [minAdultDose, setMinAdultDose] = useState(ADULT_DOSE_MIN)
    const [maxAdultDose, setMaxAdultDose] = useState(ADULT_DOSE_MAX)
    const [drugDoses, setDrugDoses] = useState<DrugDose[]>([])
    const [isLoading, setIsLoading] = useState(true)

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
        setMinAdultDose(nextMinAdultDose)
        setMaxAdultDose(nextMaxAdultDose)
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
