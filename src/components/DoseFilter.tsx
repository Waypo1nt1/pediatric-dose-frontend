import { Button, Form } from 'react-bootstrap'
import { ADULT_DOSE_MAX, ADULT_DOSE_MIN, ADULT_DOSE_SCALE } from '../modules/mock'
import { getDrugDosesList, setMaxAdultDose, setMinAdultDose } from '../slices/drugDosesSlice'
import { useAppDispatch, useAppSelector } from '../store'

const DoseFilter = () => {
    const dispatch = useAppDispatch()
    const { minAdultDose, maxAdultDose, loading } = useAppSelector((state) => state.drugDoses)

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        dispatch(getDrugDosesList())
    }

    return (
        <Form className="dose-filter" onSubmit={handleSubmit}>
            <p className="dose-filter-label">Взрослая доза, мг</p>

            <div className="dose-slider-row">
                <Form.Label className="dose-slider-caption" htmlFor="min_adult_dose">от</Form.Label>
                <Form.Range
                    className="dose-slider"
                    id="min_adult_dose"
                    min={ADULT_DOSE_MIN}
                    max={ADULT_DOSE_MAX}
                    step={10}
                    value={minAdultDose}
                    onChange={(event) => dispatch(setMinAdultDose(Number(event.target.value)))}
                />
                <span className="dose-slider-value">{minAdultDose}</span>
            </div>

            <div className="dose-slider-row">
                <Form.Label className="dose-slider-caption" htmlFor="max_adult_dose">до</Form.Label>
                <Form.Range
                    className="dose-slider"
                    id="max_adult_dose"
                    min={ADULT_DOSE_MIN}
                    max={ADULT_DOSE_MAX}
                    step={10}
                    value={maxAdultDose}
                    onChange={(event) => dispatch(setMaxAdultDose(Number(event.target.value)))}
                />
                <span className="dose-slider-value">{maxAdultDose}</span>
            </div>

            <div className="dose-slider-scale">
                {ADULT_DOSE_SCALE.map((mark) => (
                    <span className="dose-slider-mark" key={mark}>{mark}</span>
                ))}
            </div>

            <Button className="dose-filter-button" type="submit" disabled={loading}>Найти</Button>
        </Form>
    )
}

export default DoseFilter
