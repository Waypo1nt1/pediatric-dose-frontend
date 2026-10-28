import { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { ADULT_DOSE_MAX, ADULT_DOSE_MIN, ADULT_DOSE_SCALE } from '../modules/mock'

interface DoseFilterProps {
    minAdultDose: number
    maxAdultDose: number
    onApply: (minAdultDose: number, maxAdultDose: number) => void
}

const DoseFilter = ({ minAdultDose, maxAdultDose, onApply }: DoseFilterProps) => {
    const [minValue, setMinValue] = useState(minAdultDose)
    const [maxValue, setMaxValue] = useState(maxAdultDose)

    useEffect(() => {
        setMinValue(minAdultDose)
        setMaxValue(maxAdultDose)
    }, [minAdultDose, maxAdultDose])

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        onApply(Math.min(minValue, maxValue), Math.max(minValue, maxValue))
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
                    value={minValue}
                    onChange={(event) => setMinValue(Number(event.target.value))}
                />
                <span className="dose-slider-value">{minValue}</span>
            </div>

            <div className="dose-slider-row">
                <Form.Label className="dose-slider-caption" htmlFor="max_adult_dose">до</Form.Label>
                <Form.Range
                    className="dose-slider"
                    id="max_adult_dose"
                    min={ADULT_DOSE_MIN}
                    max={ADULT_DOSE_MAX}
                    step={10}
                    value={maxValue}
                    onChange={(event) => setMaxValue(Number(event.target.value))}
                />
                <span className="dose-slider-value">{maxValue}</span>
            </div>

            <div className="dose-slider-scale">
                {ADULT_DOSE_SCALE.map((mark) => (
                    <span className="dose-slider-mark" key={mark}>{mark}</span>
                ))}
            </div>

            <Button className="dose-filter-button" type="submit">Найти</Button>
        </Form>
    )
}

export default DoseFilter
