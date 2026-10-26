import type { DrugDose } from '../types'

const MEDIA_BASE_URL = 'http://localhost:9000/drug-dose-media'

export const DEFAULT_IMAGE_URL = '/default-cover.png'
export const DEFAULT_VIDEO_URL = '/default-video.mp4'

export const DRUG_DOSES_MOCK: DrugDose[] = [
    {
        id: 1,
        drug_dose_name: 'Парацетамол',
        short_info:
            'Ненаркотический анальгетик и антипиретик первой линии. Ингибирует циклооксигеназу преимущественно в центральной нервной системе. Разовая доза для взрослого 500 мг, интервал между приёмами не менее четырёх часов. Детская доза пересчитывается по площади поверхности тела.',
        image_url: `${MEDIA_BASE_URL}/paracetamol.jpg`,
        video_url: `${MEDIA_BASE_URL}/paracetamol.mp4`,
        recommended_adult_dose_mg: 500,
        max_daily_dose_mg: 4000,
        likes_count: 4,
    },
    {
        id: 2,
        drug_dose_name: 'Ибупрофен',
        short_info:
            'Нестероидный противовоспалительный препарат группы пропионовой кислоты. Обладает противовоспалительным, анальгезирующим и жаропонижающим действием. Разовая доза для взрослого 400 мг, кратность приёма до трёх раз в сутки, приём после еды.',
        image_url: `${MEDIA_BASE_URL}/ibuprofen.jpg`,
        video_url: `${MEDIA_BASE_URL}/ibuprofen.mp4`,
        recommended_adult_dose_mg: 400,
        max_daily_dose_mg: 1200,
        likes_count: 2,
    },
    {
        id: 3,
        drug_dose_name: 'Амоксициллин',
        short_info:
            'Полусинтетический пенициллин широкого спектра действия. Бактерицидный антибиотик, нарушающий синтез клеточной стенки. Стандартная схема для взрослого составляет 500 мг три раза в сутки курсом от пяти до семи дней.',
        image_url: `${MEDIA_BASE_URL}/amoxicillin.jpg`,
        video_url: `${MEDIA_BASE_URL}/amoxicillin.mp4`,
        recommended_adult_dose_mg: 500,
        max_daily_dose_mg: 1500,
        likes_count: 3,
    },
    {
        id: 4,
        drug_dose_name: 'Цефтриаксон',
        short_info:
            'Цефалоспорин третьего поколения для парентерального применения. Применяется при тяжёлых бактериальных инфекциях. Взрослая доза 1000 мг один раз в сутки, при тяжёлом течении суточная доза увеличивается до 4000 мг в два введения.',
        image_url: `${MEDIA_BASE_URL}/ceftriaxone.jpg`,
        video_url: `${MEDIA_BASE_URL}/ceftriaxone.mp4`,
        recommended_adult_dose_mg: 1000,
        max_daily_dose_mg: 4000,
        likes_count: 1,
    },
    {
        id: 5,
        drug_dose_name: 'Метотрексат',
        short_info:
            'Антиметаболит, дозируемый строго по площади поверхности тела. Цитостатик группы антагонистов фолиевой кислоты. Расчёт дозы по площади поверхности тела обязателен, отклонение от расчётной дозы недопустимо. Для взрослого ориентировочная разовая доза составляет 20 мг.',
        image_url: `${MEDIA_BASE_URL}/methotrexate.jpg`,
        video_url: `${MEDIA_BASE_URL}/methotrexate.mp4`,
        recommended_adult_dose_mg: 20,
        max_daily_dose_mg: 25,
        likes_count: 5,
    },
    {
        id: 8,
        drug_dose_name: 'Ципрофлоксацин',
        short_info:
            'Фторхинолон второго поколения широкого спектра действия. Подавляет ДНК-гиразу бактерий и действует бактерицидно. Взрослая доза 250 мг два раза в сутки, при тяжёлых инфекциях разовая доза увеличивается до 750 мг.',
        image_url: `${MEDIA_BASE_URL}/ciprofloxacin.jpg`,
        video_url: '',
        recommended_adult_dose_mg: 250,
        max_daily_dose_mg: 1000,
        likes_count: 3,
    },
    {
        id: 9,
        drug_dose_name: 'Омепразол',
        short_info:
            'Ингибитор протонного насоса, снижающий секрецию соляной кислоты в желудке. Капсула содержит кишечнорастворимые гранулы, поэтому её нельзя разжёвывать. Взрослая доза 20 мг один раз в сутки утром до еды.',
        image_url: '',
        video_url: `${MEDIA_BASE_URL}/omeprazole.mp4`,
        recommended_adult_dose_mg: 20,
        max_daily_dose_mg: 40,
        likes_count: 4,
    },
    {
        id: 10,
        drug_dose_name: 'Диклофенак',
        short_info:
            'Нестероидный противовоспалительный препарат из производных фенилуксусной кислоты. Обладает выраженным обезболивающим и противовоспалительным действием при болях в суставах и мышцах. Взрослая разовая доза 50 мг, суточная не более 150 мг.',
        image_url: `${MEDIA_BASE_URL}/diclofenac.jpg`,
        video_url: `${MEDIA_BASE_URL}/diclofenac.mp4`,
        recommended_adult_dose_mg: 50,
        max_daily_dose_mg: 150,
        likes_count: 2,
    },
]

export const ADULT_DOSE_MIN = 0
export const ADULT_DOSE_MAX = 1000
