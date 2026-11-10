import { useEffect, useMemo, useRef, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { Navigate } from 'react-router-dom'
import { mediaUrl } from '../modules/media'
import { DEFAULT_IMAGE_URL, DEFAULT_VIDEO_URL } from '../modules/mock'
import {
    createDrugDose,
    getDrugDoseDraft,
    publishDrugDose,
    setDrugDoseName,
    setMaxDailyDoseMg,
    setRecommendedAdultDoseMg,
    setShortInfo,
} from '../slices/drugDoseDraftSlice'
import { useAppDispatch, useAppSelector } from '../store'

const DrugDoseDraftPage = () => {
    const dispatch = useAppDispatch()
    const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)
    const { draft, drugDoseName, shortInfo, recommendedAdultDoseMg, maxDailyDoseMg, loading, error, message } =
        useAppSelector((state) => state.drugDoseDraft)

    const [image, setImage] = useState<File | null>(null)
    const [video, setVideo] = useState<File | null>(null)
    const imageInput = useRef<HTMLInputElement>(null)
    const videoInput = useRef<HTMLInputElement>(null)

    const imagePreview = useMemo(() => (image ? URL.createObjectURL(image) : ''), [image])
    const videoPreview = useMemo(() => (video ? URL.createObjectURL(video) : ''), [video])

    useEffect(() => {
        document.title = 'Добавление дозы препарата'
    }, [])

    useEffect(
        () => () => {
            if (imagePreview) {
                URL.revokeObjectURL(imagePreview)
            }
        },
        [imagePreview],
    )

    useEffect(
        () => () => {
            if (videoPreview) {
                URL.revokeObjectURL(videoPreview)
            }
        },
        [videoPreview],
    )

    useEffect(() => {
        if (isAuthenticated) {
            dispatch(getDrugDoseDraft())
        }
    }, [dispatch, isAuthenticated])

    if (!isAuthenticated) {
        return <Navigate to="/users/login" replace />
    }

    const handleCreate = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (!image || !video) {
            return
        }

        dispatch(createDrugDose({ drugDoseName, image, video }))
        setImage(null)
        setVideo(null)

        if (imageInput.current) {
            imageInput.current.value = ''
        }

        if (videoInput.current) {
            videoInput.current.value = ''
        }
    }

    const handlePublish = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        dispatch(publishDrugDose())
    }

    return (
        <div className="screen">
            <header className="screen-header">
                <h1 className="screen-title">Добавление дозы препарата</h1>
                <p className="screen-subtitle">Черновик карточки дозы препарата</p>
            </header>

            {message && <p className="draft-message">{message}</p>}
            {error && <p className="draft-error">{error}</p>}

            {!draft && (
                <Form className="draft-form" onSubmit={handleCreate}>
                    <section className="draft-section">
                        <h2 className="draft-section-title">Новая доза препарата</h2>

                        <div className="draft-media">
                            <img
                                className="draft-preview-image"
                                src={imagePreview || DEFAULT_IMAGE_URL}
                                alt={drugDoseName}
                            />
                            <video
                                key={videoPreview}
                                className="draft-preview-video"
                                src={videoPreview || DEFAULT_VIDEO_URL}
                                poster={imagePreview || DEFAULT_IMAGE_URL}
                                autoPlay
                                loop
                                muted
                                playsInline
                            />
                        </div>

                        <Form.Label className="draft-label" htmlFor="image_file">Файл изображения</Form.Label>
                        <Form.Control
                            className="draft-file"
                            id="image_file"
                            type="file"
                            accept="image/jpeg"
                            required
                            ref={imageInput}
                            onChange={(event) =>
                                setImage((event.target as HTMLInputElement).files?.[0] ?? null)
                            }
                        />

                        <Form.Label className="draft-label" htmlFor="video_file">Файл видео</Form.Label>
                        <Form.Control
                            className="draft-file"
                            id="video_file"
                            type="file"
                            accept="video/mp4"
                            required
                            ref={videoInput}
                            onChange={(event) =>
                                setVideo((event.target as HTMLInputElement).files?.[0] ?? null)
                            }
                        />
                    </section>

                    <section className="draft-section">
                        <h2 className="draft-section-title">Описание дозы препарата</h2>

                        <Form.Label className="draft-label" htmlFor="drug_dose_name">Наименование</Form.Label>
                        <Form.Control
                            className="draft-input"
                            id="drug_dose_name"
                            type="text"
                            value={drugDoseName}
                            onChange={(event) => dispatch(setDrugDoseName(event.target.value))}
                            required
                        />

                    </section>

                    <Button className="dose-filter-button" type="submit" disabled={loading}>Далее</Button>
                </Form>
            )}

            {draft && (
                <Form className="draft-form" onSubmit={handlePublish}>
                    <section className="draft-section">
                        <h2 className="draft-section-title">{draft.drug_dose_name}</h2>
                        <div className="draft-media">
                            <img
                                className="draft-preview-image"
                                src={mediaUrl(draft.image_url) || DEFAULT_IMAGE_URL}
                                alt={draft.drug_dose_name}
                            />
                            <video
                                className="draft-preview-video"
                                src={mediaUrl(draft.video_url) || DEFAULT_VIDEO_URL}
                                poster={mediaUrl(draft.image_url) || DEFAULT_IMAGE_URL}
                                autoPlay
                                loop
                                muted
                                playsInline
                            />
                        </div>
                    </section>

                    <section className="draft-section">
                        <h2 className="draft-section-title">Описание дозы препарата</h2>
                        <Form.Label className="draft-label" htmlFor="short_info">Краткое описание</Form.Label>
                        <Form.Control
                            className="draft-textarea"
                            id="short_info"
                            as="textarea"
                            rows={3}
                            value={shortInfo}
                            onChange={(event) => dispatch(setShortInfo(event.target.value))}
                            required
                        />
                    </section>

                    <section className="draft-section">
                        <h2 className="draft-section-title">Дозировка</h2>
                        <div className="draft-dose-row">
                            <div className="draft-dose-field">
                                <Form.Label className="draft-label" htmlFor="recommended_adult_dose_mg">Взрослая доза, мг</Form.Label>
                                <Form.Control
                                    className="draft-input"
                                    id="recommended_adult_dose_mg"
                                    type="number"
                                    value={recommendedAdultDoseMg}
                                    onChange={(event) => dispatch(setRecommendedAdultDoseMg(event.target.value))}
                                    required
                                />
                            </div>
                            <div className="draft-dose-field">
                                <Form.Label className="draft-label" htmlFor="max_daily_dose_mg">Максимум в сутки, мг</Form.Label>
                                <Form.Control
                                    className="draft-input"
                                    id="max_daily_dose_mg"
                                    type="number"
                                    value={maxDailyDoseMg}
                                    onChange={(event) => dispatch(setMaxDailyDoseMg(event.target.value))}
                                    required
                                />
                            </div>
                        </div>
                    </section>

                    <Button className="dose-filter-button" type="submit" disabled={loading}>Опубликовать</Button>
                </Form>
            )}
        </div>
    )
}

export default DrugDoseDraftPage
