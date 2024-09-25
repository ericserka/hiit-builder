import importedDayJs from 'dayjs'

import duration from 'dayjs/plugin/duration'

importedDayJs.extend(duration)

export const dayjs = importedDayJs
