import React from 'react'
import ReactDOM from 'react-dom'
import './index.css';

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

const App = () => {
   const courses = [
      {
         name: 'Half Stack application development',
         id: 1,
         parts: [
            {
               name: 'Fundamentals of React',
               exercises: 10,
               id: 1
            },
            {
               name: 'Using props to pass data',
               exercises: 7,
               id: 2
            },
            {
               name: 'State of a component',
               exercises: 14,
               id: 3
            },
            {
               name: 'Redux',
               exercises: 11,
               id: 4
            }
         ]
      }, 
      {
         name: 'Node.js',
         id: 2,
         parts: [
            {
               name: 'Routing',
               exercises: 3,
               id: 1
            },
            {
               name: 'Middlewares',
               exercises: 7,
               id: 2
            }
         ]
      }
   ]

   return (
      <div>
         <h1>Web development curriculum</h1>
         
         {courses.map((course) => (
            <Course course={course} />
         ))}
      </div>
   )
}

ReactDOM.render(<App />, document.getElementById('root'))