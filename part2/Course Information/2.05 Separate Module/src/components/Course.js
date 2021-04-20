import React from 'react'

const Header = ({name}) => (
   <h2>{name}</h2>
)

const Part = ({name, exercises}) => (
   <p>{name} {exercises}</p>
)

const Content = ({parts}) => (
   <div>
      {parts.map((part) => (
         <Part key={part.id} name={part.name} exercises={part.exercises} />
      ))}
   </div>
)

const Total = ({parts}) => {
   const total = parts.reduce((a, b) => a + b.exercises, 0)

   return (
      <b>
         total of {total} exercises
      </b>
   )
}

const Course = ({course}) => (
   <div>
      <Header name={course.name} />

      <Content parts={course.parts} />

      <Total parts={course.parts} />
   </div>
)

export default Course