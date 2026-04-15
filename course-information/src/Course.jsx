const Course = ({ course }) => {
  const Header = ({ course }) => <h1>{course.name}</h1>

  const Part = ({ course }) => {
    return (
      <p>
        {course.name} {course.exercises}
      </p>
    )
  }

  const Content = ({ course }) => {
    return (
      <div>
        {course.parts.map((c) => (
          <p key={c.id}>
            {c.name} {c.exercises}
          </p>
        ))}
      </div>
    )
  }

  const Total = (course) => {
    console.log('TOTAL', course)

    return (
      <p>
        Number of exercises{' '}
        {course.course.parts[0].exercises +
          course.course.parts[1].exercises +
          course.course.parts[2].exercises}
      </p>
    )
  }

  return (
    <div>
      <Content course={course} />
    </div>
  )
}

export default Course
