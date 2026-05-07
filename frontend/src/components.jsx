import { Link, useNavigate, useParams } from "react-router-dom"
import { useState, useEffect, useRef } from "react"

export function Home() {
  return (
    <div className="container">
      <h1>Welcome!</h1>
      <div>
        Using this site, you can:
        <ul>
          <li>
            <Link to="/courses">View all courses offered.</Link>
          </li>
          <li>
            <Link to="/students">See a list of all students.</Link>
          </li>
          <li>
            <Link  to="/enroll">Enroll a student into a course</Link>
          </li>
          <li>
            <Link to="/newcourse">Create a new Course</Link>
          </li>
          <li>
            <Link to="/newstudent">Create a new Student</Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export function Course() {
  let params = useParams()
  const navigate = useNavigate()
  const [courseDetails, setCourseDetails] = useState({})
  const [students, setStudents] = useState({})
  const [pending, setPending] = useState(true)
  const [error, setError] = useState(null)
  
  const openStudent = async (e) => {
    if(e.target.nodeName == "TD" || e.target.nodeName == "TH"){
      navigate(`/students/${e.target.parentElement.getAttribute("data-sid")}`)
    } else {
      navigate(`/students/${e.target.getAttribute("data-sid")}`)
    }
  }

  useEffect(()=>{
    async function getCourseData(){
      try {
        const resp = await fetch(`${import.meta.env.VITE_API_URL}/courses/${params.id}`)
        if (!resp.ok) throw new Error("Unable to load course...")
        const respData = await resp.json()
        setCourseDetails(respData.messageText.details)
        setStudents(respData.messageText.students)
        setPending(false)
      } catch (err) {
        setError(err.messageText)
        setPending(false)
      }
    }

    getCourseData()
  },[])

  if (pending) return (
    <div className="container">
      Fetching course...
    </div>
  )

  if (error) return (
    <div className="container">
      <div className="alert alert-danger d-flex align-items-center" role="alert">
        <span className="material-symbols-rounded filled-icon pe-2">dangerous</span>{err}
      </div>
    </div>
  )
  
  if (students.length < 1) return (
    <div className="container">
      <h1>Course Details</h1>
      <p>{courseDetails.CourseNumber} - {courseDetails.CourseName}</p>
      <p>{courseDetails.CourseDescription}</p>
      <h3>Credit Hours</h3>
      <p>{courseDetails.CourseCreditHours}</p>
      <h3>Learning Type</h3>
      <p>{courseDetails.CourseInstructionType}</p>
      <h1 className="mt-5">Enrolled Students</h1>
      <p>No students are currently enrolled.</p>
    </div>
  )

  return (
    <div className="container">
      <h1>Course Details</h1>
      <p>{courseDetails.CourseNumber} - {courseDetails.CourseName}</p>
      <p>{courseDetails.CourseDescription}</p>
      <h3>Credit Hours</h3>
      <p>{courseDetails.CourseCreditHours}</p>
      <h3>Learning Type</h3>
      <p>{courseDetails.CourseInstructionType}</p>
      <h1 className="mt-5">Enrolled Students</h1>
      <table className="table table-hover">
        <tbody>
          {students.map((student,ind)=>{
            return (
              <tr className="hover-cursor-pointer" key={ind} data-sid={student.StudentID} onClick={openStudent}>
                <th scope="row">{student.StudentName}</th>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export function Courses() {
  const navigate = useNavigate()
  const ref = useRef(null)
  const [courses, setCourses] = useState([])
  const [pending, setPending] = useState(true)
  const [error, setError] = useState(null)
  
  const openCourse = async (e) => {
    if(e.target.nodeName == "TD" || e.target.nodeName == "TH"){
      navigate(`/courses/${e.target.parentElement.getAttribute("data-cid")}`)
    } else {
      navigate(`/courses/${e.target.getAttribute("data-cid")}`)
    }
  }

  useEffect(()=>{
    async function getCourses(){
      try {
        const resp = await fetch(`${import.meta.env.VITE_API_URL}/courses/`)
        if (!resp.ok) throw new Error("Unable to load courses...")
        const respData = await resp.json()
        setCourses(respData.messageText)
        setPending(false)
      } catch (err) {
        setError(err.messageText)
        setPending(false)
      }
    }

    getCourses()
  },[])

  if (pending) return (
    <div className="container">
      Fetching courses...
    </div>
  )

  if (error) return (
    <div className="container">
      <div className="alert alert-danger d-flex align-items-center" role="alert">
        <span className="material-symbols-rounded filled-icon pe-2">dangerous</span>{err}
      </div>
    </div>
  )
  
  return (
    <div className="container">
      <h1>All Courses Offered</h1>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">Course #</th>
            <th scope="col">Course Name</th>
            <th scope="col">Course Type</th>
            <th scope="col">Credit Hours</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course,ind)=>{
          return (
          <tr ref={ref} className="hover-cursor-pointer" key={ind} data-cid={course.CourseID} onClick={openCourse}>
            <th scope="row">{course.CourseNumber}</th>
            <td>{course.CourseName}</td>
            <td>{course.CourseInstructionType}</td>
            <td>{course.CourseCreditHours}</td>
          </tr>
          )
          })}
        </tbody>
      </table>
    </div>
  )
}

export function Student() {
  let params = useParams()
  const navigate = useNavigate()
  const [studentDetails, setStudentDetails] = useState({})
  const [courses, setCourses] = useState({})
  const [pending, setPending] = useState(true)
  const [error, setError] = useState(null)
  
  const openCourse = async (e) => {
    if(e.target.nodeName == "TD" || e.target.nodeName == "TH"){
      navigate(`/courses/${e.target.parentElement.getAttribute("data-cid")}`)
    } else {
      navigate(`/courses/${e.target.getAttribute("data-cid")}`)
    }
  }

  useEffect(()=>{
    async function getCourseData(){
      try {
        const resp = await fetch(`${import.meta.env.VITE_API_URL}/students/${params.id}`)
        if (!resp.ok) throw new Error("Unable to load student...")
        const respData = await resp.json()
        setStudentDetails(respData.messageText.details)
        setCourses(respData.messageText.courses)
        setPending(false)
      } catch (err) {
        setError(err.messageText)
        setPending(false)
      }
    }

    getCourseData()
  },[])

  if (pending) return (
    <div className="container">
      Fetching course...
    </div>
  )

  if (error) return (
    <div className="container">
      <div className="alert alert-danger d-flex align-items-center" role="alert">
        <span className="material-symbols-rounded filled-icon pe-2">dangerous</span>{err}
      </div>
    </div>
  )
  
  if (courses.length < 1) return (
    <div className="container">
      <h1>Student Details</h1>
      <p>Student Name: {studentDetails.StudentName}</p>
      <p>Student ID: {studentDetails.StudentID}</p>
      <h2 className="mt-5">Enrolled Courses</h2>
      <p>Not currently enrolled in any courses.</p>
    </div>
  )

  return (
    <div className="container">
      <h1>Student Details</h1>
      <p>Student Name: {studentDetails.StudentName}</p>
      <p>Student ID: {studentDetails.StudentID}</p>
      <h2 className="mt-5">Enrolled Courses</h2>
      <table className="table table-hover">
        <tbody>
          {courses.map((course,ind)=>{
            return (
              <tr className="hover-cursor-pointer" key={ind} data-cid={course.CourseID} onClick={openCourse}>
                <th scope="row">{course.CourseName}</th>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export function Students() {
  const navigate = useNavigate()
  const [students, setStudents] = useState([])
  const [pending, setPending] = useState(true)
  const [error, setError] = useState(null)
  
  const openStudent = async (e) => {
    if(e.target.nodeName == "TD" || e.target.nodeName == "TH"){
      navigate(`/students/${e.target.parentElement.getAttribute("data-sid")}`)
    } else {
      navigate(`/students/${e.target.getAttribute("data-sid")}`)
    }
  }


  useEffect(()=>{
    async function getCourses(){
      try {
        const resp = await fetch(`${import.meta.env.VITE_API_URL}/students/`)
        if (!resp.ok) throw new Error("Unable to load students...")
        const respData = await resp.json()
        setStudents(respData.messageText)
        setPending(false)
      } catch (err) {
        setError(err.messageText)
        setPending(false)
      }
    }

    getCourses()
  },[])

  if (pending) return (
    <div className="container">
      Fetching students..
    </div>
  )

  if (error) return (
    <div className="container">
      <div className="alert alert-danger d-flex align-items-center" role="alert">
        <span className="material-symbols-rounded filled-icon pe-2">dangerous</span>{err}
      </div>
    </div>
  )
  
  return (
    <div className="container">
      <h1>All Registered Students</h1>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">Name</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student,ind)=>{
          return (
          <tr className="hover-cursor-pointer" key={ind} data-sid={student.StudentID} onClick={openStudent}>
            <th scope="row">{student.StudentName}</th>
          </tr>
          )
          })}
        </tbody>
      </table>
    </div>
  )
}

export function Enroll() {
const navigate = useNavigate()
  const [showWarn, setShowWarn] = useState(false)
  const [selectedCourseID, setSelectedCourseID] = useState("")
  const [selectedStudentID,setSelectedStudentID] = useState("")
  const [allCourses,setAllCourses] = useState([])
  const [allStudents,setAllStudents] = useState([])
  const [error,setError] = useState(null)
  const [pending,setPending] = useState(true)
  
  useEffect(()=>{
    async function getAllData(){
      try {
        const reqForCourses = await fetch(`${import.meta.env.VITE_API_URL}/courses/`)
        if (!reqForCourses.ok) throw new Error("Unable to load courses...")
        const respForCoursesData = await reqForCourses.json()
        setAllCourses(respForCoursesData.messageText)

        const reqForStudents = await fetch(`${import.meta.env.VITE_API_URL}/students/`)
        if (!reqForStudents.ok) throw new Error("Unable to load students...")
        const respForStudentData = await reqForStudents.json()
        setAllStudents(respForStudentData.messageText)

        setPending(false)
      } catch (err) {
        setError(err.messageText)
        setPending(false)
      }
    }
    getAllData()
  },[])

  const addEnroll = async (e) =>{
    if (pending) throw new Error("pending all data request...")
    e.preventDefault()
    if (
      selectedCourseID == "" ||
      selectedStudentID == ""
    ){
      setShowWarn(true)
    } else {
      setShowWarn(false)
      try {
        const enrollID = Date.now()
        const resp = await fetch(`${import.meta.env.VITE_API_URL}/enrollments/`,{
          method:"POST",
          headers:{'Content-Type': 'application/json'},
          body: JSON.stringify({
            CourseID: selectedCourseID,
            StudentID: selectedStudentID,
            EnrollmentID: enrollID
          })          
        })
        if (!resp.ok) throw new Error
        const respData = await resp.json()
      }
      catch(err){

      }
      navigate("/")
    }
  }
  if (pending) return(
    <div className="container">
      Fetching students and courses...
    </div>
  )
  return (
    <div className="container">
      <div className={showWarn? "visible" : "invisible"}>
        <div className="alert alert-warning d-flex align-items-center" role="alert">
          <span className="material-symbols-rounded filled-icon pe-2">warning</span>Please add values to all fields!
        </div>
      </div>
      <select defaultValue="" className="form-select mb-3" aria-label="Select a Course" name="enrollCourse" onChange={(e)=>{setSelectedCourseID(e.target.value)}}>
        <option value="">-Select a Course-</option>
        {allCourses.map((course,ind)=>{
          return ( 
            <option key={course._id} value={course.CourseID}>{course.CourseName}</option>
          )
        })}
      </select>
      <select defaultValue="" className="form-select mb-3" aria-label="Select a Student" name="enrollStudent" onChange={(e)=>{setSelectedStudentID(e.target.value)}}>
        <option value="">-Select a Student-</option>
        {allStudents.map((student,ind)=>{
          return ( 
            <option key={student._id} value={student.StudentID}>{student.StudentName}</option>
          )
        })}
      </select>
      <button id="addStudentBtn" type="button" className="btn btn-primary" onClick={addEnroll}>Enroll</button>
    </div>
  )
}

export function NewCourse() {
  const navigate = useNavigate()
  const [showWarn, setShowWarn] = useState(false)
  const [courseID, setCourseID] = useState("")
  const [courseName,setCourseName] = useState("")
  const [courseNumber,setCourseNumber] = useState("")
  const [courseInstructionType,setCourseInstructionType] = useState("")
  
  const addCourse = async (e) =>{
    e.preventDefault()
    if (
      courseID == "" ||
      courseName == "" ||
      courseNumber == "" ||
      courseInstructionType == ""
    ){
      setShowWarn(true)
    } else {
      setShowWarn(false)
      try {
        const resp = await fetch(`${import.meta.env.VITE_API_URL}/courses/`,{
          method:"POST",
          headers:{'Content-Type': 'application/json'},
          body: JSON.stringify({
            CourseID: courseID,
            CourseName: courseName,
            CourseNumber: courseNumber,
            CourseInstructionType: courseInstructionType
          })          
        })
        if (!resp.ok) throw new Error
        const respData = await resp.json()
      }
      catch(err){

      }
      navigate("/courses")
    }
  }
  return (
    <div className="container">
      <div className={showWarn? "visible" : "invisible"}>
        <div className="alert alert-warning d-flex align-items-center" role="alert">
          <span className="material-symbols-rounded filled-icon pe-2">warning</span>Please add values to all fields!
        </div>
      </div>
      <div className="form-floating mb-3">
        <input type="text" className="form-control" id="floatingCourseID" value={courseID} onChange={(e)=>{setCourseID(e.target.value)}} placeholder="Course ID"/>
        <label htmlFor="floatingCourseID">Course ID</label>
      </div>
      <div className="form-floating mb-3">
        <input type="text" className="form-control" id="floatingCourseName" value={courseName} onChange={(e)=>{setCourseName(e.target.value)}} placeholder="Firstname Lastname"/>
        <label htmlFor="floatingCourseName">Course Name</label>
      </div>
      <div className="form-floating mb-3">
        <input type="text" className="form-control" id="floatingCourseNumber" value={courseNumber} onChange={(e)=>{setCourseNumber(e.target.value)}} placeholder="Prog 101"/>
        <label htmlFor="floatingCourseNumber">Course Number</label>
      </div>
      <select defaultValue="" className="form-select mb-3" aria-label="Select an Instruction Type" name="courseInstructionType" onChange={(e)=>{setCourseInstructionType(e.target.value)}}>
        <option value="">-Select an Instruction Type-</option>
        <option value="Hybrid">Hybrid</option>
        <option value="On Campus">On Campus</option>
        <option value="Remote">Remote</option>
      </select>
      <button id="addStudentBtn" type="button" className="btn btn-primary" onClick={addCourse}>Add</button>
    </div>
  )
}

export function NewStudent() {
  const navigate = useNavigate()
  const [showWarn, setShowWarn] = useState(false)
  const [studentID,setStudentID] = useState("")
  const [studentName,setStudentName] = useState("")
  const addStudent = async (e) =>{
    e.preventDefault()
    if (studentID == "" || studentName == ""){
      setShowWarn(true)
    } else {
      setShowWarn(false)
      try {
        const resp = await fetch(`${import.meta.env.VITE_API_URL}/students/`,{
          method:"POST",
          headers:{'Content-Type': 'application/json'},
          body: JSON.stringify({StudentID:studentID,StudentName:studentName})          
        })
        if (!resp.ok) throw new Error
        const respData = await resp.json()
        
          
      }
      catch(err){

      }
      navigate("/students")
    }
  }
  return (
    <div className="container">
      <div className={showWarn? "visible" : "invisible"}>
        <div className="alert alert-warning d-flex align-items-center" role="alert">
          <span className="material-symbols-rounded filled-icon pe-2">warning</span>Please add values to all fields!
        </div>
      </div>
      <div className="form-floating mb-3">
        <input type="text" className="form-control" id="floatingStudentID" value={studentID} onChange={(e)=>{setStudentID(e.target.value)}} placeholder="Student ID"/>
        <label htmlFor="floatingStudentID">Student ID</label>
      </div>
      <div className="form-floating mb-3">
        <input type="text" className="form-control" id="floatingFullName" value={studentName} onChange={(e)=>{setStudentName(e.target.value)}} placeholder="Firstname Lastname"/>
        <label htmlFor="floatingFullName">Student Name</label>
      </div>
      <button id="addStudentBtn" type="button" className="btn btn-primary" onClick={addStudent}>Add</button>
    </div>
  )
}

export function PageNotFound() {
  return (
    <div className="container">
      <div className="alert alert-warning d-flex align-items-center" role="alert">
        <span className="material-symbols-rounded filled-icon pe-2">warning</span>Oops! There isn't any content to see here!<Link className="ps-2 link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover" to="/">Go Home</Link>
      </div>
    </div>
  )
}
