import { useEffect, useState } from 'react'
import { Button, Spinner } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { DEFAULT_IMAGE_URL, DEFAULT_VIDEO_URL, DRUG_DOSES_MOCK } from '../modules/mock'
import type { DrugDose } from '../types'

const DrugDoseFeedPage = () => {
    const { drug_dose_id } = useParams()
    const navigate = useNavigate()
    const [drugDose, setDrugDose] = useState<DrugDose | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isDescriptionOpen, setIsDescriptionOpen] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        setIsDescriptionOpen(false)

        const timer = setTimeout(() => {
            const currentId = Number(drug_dose_id)
            const found = DRUG_DOSES_MOCK.find((item) => item.id === currentId)
            setDrugDose(found ?? DRUG_DOSES_MOCK[0] ?? null)
            setIsLoading(false)
        }, 300)

        return () => clearTimeout(timer)
    }, [drug_dose_id])

    useEffect(() => {
        document.title = 'Лента доз препаратов'
    }, [])

    const handleNext = () => {
        if (!drugDose) {
            return
        }

        const currentIndex = DRUG_DOSES_MOCK.findIndex((item) => item.id === drugDose.id)
        const nextDrugDose = DRUG_DOSES_MOCK[(currentIndex + 1) % DRUG_DOSES_MOCK.length]
        navigate(`/drug_doses/feed/${nextDrugDose.id}`)
    }

    if (isLoading) {
        return (
            <div className="screen screen-feed">
                <div className="screen-loader">
                    <Spinner animation="border" role="status" variant="light" />
                </div>
            </div>
        )
    }

    if (!drugDose) {
        return (
            <div className="screen screen-feed">
                <p className="empty-note">Опубликованные дозы препаратов отсутствуют</p>
            </div>
        )
    }

    return (
        <div className="screen screen-feed">
            <video
                key={drugDose.id}
                className="drug-video"
                src={drugDose.video_url || DEFAULT_VIDEO_URL}
                poster={drugDose.image_url || DEFAULT_IMAGE_URL}
                onError={(event) => {
                    event.currentTarget.src = DEFAULT_VIDEO_URL
                }}
                autoPlay
                loop
                muted
                playsInline
            />

            <div className="drug-scrim" />

            <div className="drug-rail">
                <dl className="drug-params">
                    <div className="drug-param">
                        <dt className="drug-param-label">Взрослая доза</dt>
                        <dd className="drug-param-value">{drugDose.recommended_adult_dose_mg} мг</dd>
                    </div>
                    <div className="drug-param">
                        <dt className="drug-param-label">Максимум в сутки</dt>
                        <dd className="drug-param-value">{drugDose.max_daily_dose_mg} мг</dd>
                    </div>
                </dl>

                <p className="drug-like">
                    <svg className="drug-rail-icon" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 20.6l-1.3-1.2C5.8 15 2.8 12.3 2.8 8.9c0-2.6 2.1-4.7 4.7-4.7 1.5 0 2.9.7 3.8 1.8l.7.9.7-.9c.9-1.1 2.3-1.8 3.8-1.8 2.6 0 4.7 2.1 4.7 4.7 0 3.4-3 6.1-7.9 10.5l-1.3 1.2z" />
                    </svg>
                    <span className="drug-rail-caption">{drugDose.likes_count}</span>
                </p>

                <Button className="drug-next" variant="link" onClick={handleNext}>
                    <svg className="drug-rail-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h13M13 6l6 6-6 6" />
                    </svg>
                    <span className="drug-rail-caption">Далее</span>
                </Button>
            </div>

            <div className="drug-caption">
                <h1 className="drug-title">{drugDose.drug_dose_name}</h1>

                <p className={isDescriptionOpen ? 'drug-description drug-description-open' : 'drug-description'}>
                    {drugDose.short_info}
                </p>

                <Button className="drug-description-toggle" variant="link" onClick={() => setIsDescriptionOpen(!isDescriptionOpen)}>
                    {isDescriptionOpen ? 'меньше' : 'больше'}
                </Button>
            </div>
        </div>
    )
}

export default DrugDoseFeedPage
