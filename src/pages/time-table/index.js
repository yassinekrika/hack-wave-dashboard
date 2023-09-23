import React from 'react'


const TimeTable = () => {

    const days = ['', 'Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri']
    return (
        <div style={{display: 'flex'}}>
            {days.map((day, index)=><SubjectEditor day={day} rwIdx={index}></SubjectEditor>)}
        </div>
    )
}

const DayEditor = ({children})=>{
    return (
        <div className='day-editor'>
            {children}
        </div>
    )
}

const SubjectEditor = ({day, rwIdx})=>{
    const hours = ['', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00']
    return (
        <div>
            {hours.map((hour, index)=>{
                if(rwIdx != 0) {
                    return index ? <DayEditor></DayEditor> : <div style={{textAlign: 'center', fontWeight: 'bold'}}>{day}</div>
                }else{
                    return  index ? <div style={{textAlign: 'center', fontWeight: 'bold',
                    height: '120px',
                    aspectRatio: 1.5,
                    margin: 2,
                display: 'grid',
            placeItems: 'center'}}>{hour}</div> : <div style={{textAlign: 'center', height: '22px'}}></div>
                }
            })}
        </div>
    )
}

export default TimeTable