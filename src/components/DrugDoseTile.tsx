import { useState } from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { DEFAULT_IMAGE_URL } from '../modules/mock'
import type { DrugDose } from '../types'

interface DrugDoseTileProps {
    drugDose: DrugDose
}

const DrugDoseTile = ({ drugDose }: DrugDoseTileProps) => {
    const [imageUrl, setImageUrl] = useState(drugDose.image_url || DEFAULT_IMAGE_URL)

    return (
        <Card className="drug-tile">
            <Link className="drug-tile-link" to={`/drug_doses/feed/${drugDose.id}`}>
                <Card.Img
                    className="drug-tile-image"
                    variant="top"
                    src={imageUrl}
                    alt={drugDose.drug_dose_name}
                    onError={() => setImageUrl(DEFAULT_IMAGE_URL)}
                />
                <Card.Title className="drug-tile-name">{drugDose.drug_dose_name}</Card.Title>
            </Link>
            <Card.Body className="drug-tile-body">
                <p className="drug-tile-dose">{drugDose.recommended_adult_dose_mg} мг для взрослого</p>
                <p className="drug-tile-likes">
                    <span className="like-heart">&#9829;</span>
                    {drugDose.likes_count}
                </p>
            </Card.Body>
        </Card>
    )
}

export default DrugDoseTile
