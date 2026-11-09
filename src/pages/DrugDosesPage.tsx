import { useEffect } from 'react'
import DoseFilter from '../components/DoseFilter'
import DrugDoseTile from '../components/DrugDoseTile'
import { getDrugDosesList } from '../slices/drugDosesSlice'
import { useAppDispatch, useAppSelector } from '../store'

const DrugDosesPage = () => {
    const dispatch = useAppDispatch()
    const { drugDoses, loading, isMock } = useAppSelector((state) => state.drugDoses)

    useEffect(() => {
        document.title = 'Плитка доз препаратов'
        dispatch(getDrugDosesList())
    }, [dispatch])

    return (
        <div className="screen">
            <header className="screen-header">
                <h1 className="screen-title">Плитка доз препаратов</h1>
                <p className="screen-subtitle">Рекомендованные дозировки для взрослых</p>
            </header>

            <DoseFilter />

            {isMock && <p className="draft-message">Веб-сервис недоступен, показаны mock-объекты</p>}

            {!loading && drugDoses.length > 0 && (
                <div className="drug-grid">
                    {drugDoses.map((drugDose) => (
                        <DrugDoseTile key={drugDose.id} drugDose={drugDose} />
                    ))}
                </div>
            )}

            {!loading && drugDoses.length === 0 && (
                <p className="empty-note">Дозы препаратов с такой дозировкой не найдены</p>
            )}
        </div>
    )
}

export default DrugDosesPage
