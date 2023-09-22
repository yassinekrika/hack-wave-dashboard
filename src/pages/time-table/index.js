import React from 'react'


const TimeTable = () => {

    const days = [0,1,2,3,4,5,6, 7]

    return (
        <div style={{display: 'flex'}}>
            {days.map((day)=><SubjectEditor></SubjectEditor>)}
        </div>
    )
}

const DayEditor = ()=>{
    return (
        <div style={{
            width: 100,
            height: 100,
            backgroundColor: 'green',
            margin: 5
        }}>
        </div>
    )
}

const SubjectEditor = ()=>{
    const hours = [0,1,2,3,4,5,6]
    return (
        <div>
            {hours.map((hour)=><DayEditor></DayEditor>)}
        </div>
    )
}

export default TimeTable