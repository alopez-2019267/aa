import { TaskList } from "../../components/TaskList.jsx"
import { useEffect } from "react"
import './dashboard.css'

export const Dashboard = () => {

  useEffect(()=>{
    console.log('Se esta cargando el componente')
  }, [])

  return (
    <div className="dashboard-container">
      <TaskList />
    </div>
  )
}
