import { parseISO, format } from 'date-fns'

export default function Date({ dateString }) {
    const date = parseISO(dateString)

    return (
        <p className="text-base">
            <time dateTime={dateString}>{format(date, 'LLLL d, yyyy')}</time>
        </p>
    )
}
