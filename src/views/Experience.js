import React from 'react'
import { View } from 'react-sketchapp'
import { MAX_TIMELINE_ITEMS } from '../../config'
import { experience as experienceHeading } from '../../data/headings'
import experienceData from '../../data/experience'
import { getDataLocale, formatDateInterval, sortByDate } from '../utils'
import { Heading, Event } from '../components'

const heading = getDataLocale(experienceHeading)
const experienceList = getDataLocale(experienceData)

const Experience = () => (
  <View name='Experience' style={{ flex: 1 }}>
    <Heading title={heading} />

    {experienceList
    .sort(sortByDate)
    .slice(0, MAX_TIMELINE_ITEMS)
    .map(({ name, description, role, contract, location, started_at: start, ended_at: end }, index) => {
      const currentDate = new Date()
      const startDate = new Date(start)
      const endDate = new Date(end)
      const dateInterval = formatDateInterval(startDate.getFullYear(), endDate.getFullYear())

      const info = [
        role,
        contract,
        location,
        dateInterval
      ].filter(x => x)

      return (
        <Event
          key={index}
          title={name}
          info={info}
          description={description}
          done={endDate < currentDate}
          isFirst={index === 0}
          isLast={index === (MAX_TIMELINE_ITEMS - 1)}
        />
      )
    })}
  </View>
)

export default Experience
