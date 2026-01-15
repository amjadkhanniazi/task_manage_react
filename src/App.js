// import { useState, useEffect } from 'react'
// import { DndProvider } from 'react-dnd'
// import { HTML5Backend } from 'react-dnd-html5-backend'
// import { motion } from 'framer-motion'
// import { FaMoon, FaSun, FaPlus, FaSignOutAlt } from 'react-icons/fa'
// import axios from 'axios'
// import TaskColumn from './components/task-column'
// import LoginForm from './components/login-form'
// import SignUpForm from './components/sign-up-form'
// import TaskForm from './components/task-form'
// import LoadingSpinner from './components/loading-spinner'

// const API_BASE_URL = 'https://task-management-mocha-iota.vercel.app'

// export default function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false)
//   const [tasks, setTasks] = useState([])
//   const [isLoading, setIsLoading] = useState(true)
//   const [isDarkMode, setIsDarkMode] = useState(false)
//   const [showTaskForm, setShowTaskForm] = useState(false)
//   const [isSignUp, setIsSignUp] = useState(false)

//   useEffect(() => {
//     const token = localStorage.getItem('token')
//     const userId = localStorage.getItem('userId')
//     if (token && userId) {
//       setIsLoggedIn(true)
//       fetchTasks(userId)
//     } else {
//       setIsLoading(false)
//     }
//   }, [])

//   const fetchTasks = async (userId) => {
//     try {
//       setIsLoading(true)
//       const response = await axios.get(`${API_BASE_URL}/tasks/users/${userId}`, {
//         headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
//       })
//       setTasks(response.data)
//     } catch (error) {
//       console.error('Error fetching tasks:', error)
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const handleLogin = async (username, password) => {
//     try {
//       setIsLoading(true)
//       const response = await axios.post(`${API_BASE_URL}/user/login`, { username, password })
//       const { token, userId } = response.data
//       localStorage.setItem('token', token)
//       localStorage.setItem('userId', userId)
//       setIsLoggedIn(true)
//       fetchTasks(userId)
//     } catch (error) {
//       console.error('Login error:', error)
//       setIsLoading(false)
//     }
//   }

//   const handleSignUp = async (username, email, password) => {
//     try {
//       setIsLoading(true)
//       await axios.post(`${API_BASE_URL}/user/register`, { username, email, password })
//       alert('Registration successful! Please login.')
//       setIsSignUp(false)
//     } catch (error) {
//       console.error('Registration error:', error)
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const handleCreateTask = async (newTask) => {
//     try {
//       setIsLoading(true)
//       const userId = localStorage.getItem('userId')
//       await axios.post(`${API_BASE_URL}/tasks`, {
//         ...newTask,
//         user_id: userId
//       }, {
//         headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
//       })
//       fetchTasks(userId)
//     } catch (error) {
//       console.error('Error creating task:', error)
//       setIsLoading(false)
//     }
//   }

//   const handleCompleteTask = async (taskId) => {
//     try {
//       setIsLoading(true)
//       await axios.patch(`${API_BASE_URL}/tasks/iscompletedtask/${taskId}`, {}, {
//         headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
//       })
//       const userId = localStorage.getItem('userId')
//       fetchTasks(userId)
//     } catch (error) {
//       console.error('Error completing task:', error)
//       setIsLoading(false)
//     }
//   }

//   const handleDeleteTask = async (taskId) => {
//     try {
//       setIsLoading(true)
//       await axios.delete(`${API_BASE_URL}/tasks/delete/${taskId}`, {
//         headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
//       })
//       const userId = localStorage.getItem('userId')
//       fetchTasks(userId)
//     } catch (error) {
//       console.error('Error deleting task:', error)
//       setIsLoading(false)
//     }
//   }

//   const handleLogout = () => {
//     localStorage.removeItem('token')
//     localStorage.removeItem('userId')
//     setIsLoggedIn(false)
//     setTasks([])
//   }

//   const incompleteTasks = tasks.filter(task => !task.completed)
//   const completedTasks = tasks.filter(task => task.completed)

//   if (!isLoggedIn) {
//     return (
//       <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
//         <div className="container mx-auto p-4 dark:bg-gray-800 min-h-screen">
//           <h1 className="text-4xl font-bold mb-8 text-center dark:text-white">Task Manager</h1>
//           {isSignUp ? (
//             <SignUpForm onSignUp={handleSignUp} onSwitchToLogin={() => setIsSignUp(false)} />
//           ) : (
//             <LoginForm onLogin={handleLogin} onSwitchToSignUp={() => setIsSignUp(true)} />
//           )}
//           <button
//             onClick={() => setIsDarkMode(!isDarkMode)}
//             className="fixed bottom-4 right-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700"
//           >
//             {isDarkMode ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-gray-700" />}
//           </button>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <DndProvider backend={HTML5Backend}>
//       <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
//         <div className="container mx-auto p-4 dark:bg-gray-800 min-h-screen">
//           <h1 className="text-4xl font-bold mb-8 text-center dark:text-white">Task Manager</h1>
//           <div className="flex mb-4 space-x-4">
//             <button
//               onClick={() => setShowTaskForm(true)}
//               className="flex-1 flex items-center justify-center p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
//             >
//               <FaPlus className="mr-2" /> Add New Task
//             </button>
//             <button
//               onClick={handleLogout}
//               className="flex-1 flex items-center justify-center p-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
//             >
//               <FaSignOutAlt className="mr-2" /> Logout
//             </button>
//           </div>
//           {showTaskForm && (
//             <TaskForm onCreateTask={handleCreateTask} onClose={() => setShowTaskForm(false)} />
//           )}
//           {isLoading ? (
//             <LoadingSpinner />
//           ) : (
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5 }}
//               className="flex flex-col md:flex-row justify-between"
//             >
//               <TaskColumn 
//                 title="Incomplete Tasks" 
//                 tasks={incompleteTasks} 
//                 onDragComplete={handleCompleteTask}
//                 onDeleteTask={handleDeleteTask}
//               />
//               <TaskColumn 
//                 title="Completed Tasks" 
//                 tasks={completedTasks} 
//                 onDragComplete={() => {}}
//                 onDeleteTask={handleDeleteTask}
//               />
//             </motion.div>
//           )}
//           <button
//             onClick={() => setIsDarkMode(!isDarkMode)}
//             className="fixed bottom-4 right-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700"
//           >
//             {isDarkMode ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-gray-700" />}
//           </button>
//         </div>
//       </div>
//     </DndProvider>
//   )
// }

import { useState, useEffect } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { motion } from 'framer-motion'
import { FaMoon, FaSun, FaPlus, FaSignOutAlt } from 'react-icons/fa'
import axios from 'axios'
import TaskColumn from './components/task-column'
import LoginForm from './components/login-form'
import SignUpForm from './components/sign-up-form'
import TaskForm from './components/task-form'
import LoadingSpinner from './components/loading-spinner'

const API_BASE_URL = 'https://task-manage-sigma-sepia.vercel.app'

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [tasks, setTasks] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [showTaskForm, setShowTaskForm] = useState(false)
  const [isSignUp, setIsSignUp] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const userId = localStorage.getItem('userId')
    if (token && userId) {
      setIsLoggedIn(true)
      fetchTasks(userId)
    } else {
      setIsLoading(false)
    }
  }, [])

  const fetchTasks = async (userId) => {
    try {
      setIsLoading(true)
      const response = await axios.get(`${API_BASE_URL}/tasks/users/${userId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      setTasks(response.data)
    } catch (error) {
      console.error('Error fetching tasks:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogin = async (username, password) => {
    try {
      setIsLoading(true)
      const response = await axios.post(`${API_BASE_URL}/user/login`, { username, password })
      const { token, userId } = response.data
      localStorage.setItem('token', token)
      localStorage.setItem('userId', userId)
      setIsLoggedIn(true)
      fetchTasks(userId)
    } catch (error) {
      console.error('Login error:', error)
      setIsLoading(false)
    }
  }

  const handleSignUp = async (username, email, password) => {
    try {
      setIsLoading(true)
      await axios.post(`${API_BASE_URL}/user/register`, { username, email, password })
      setIsLoading(false)
      setShowConfirmation(true)
    } catch (error) {
      console.error('Registration error:', error)
      setIsLoading(false)
    }
  }

  const handleCreateTask = async (newTask) => {
    try {
      setIsLoading(true)
      const userId = localStorage.getItem('userId')
      await axios.post(`${API_BASE_URL}/tasks`, {
        ...newTask,
        user_id: userId
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      fetchTasks(userId)
    } catch (error) {
      console.error('Error creating task:', error)
      setIsLoading(false)
    }
  }

  const handleCompleteTask = async (taskId) => {
    try {
      setIsLoading(true)
      await axios.patch(`${API_BASE_URL}/tasks/iscompletedtask/${taskId}`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      const userId = localStorage.getItem('userId')
      fetchTasks(userId)
    } catch (error) {
      console.error('Error completing task:', error)
      setIsLoading(false)
    }
  }


  const handleMarkCompleteTask = async (taskId) => {
    try {
      setIsLoading(true)
      await axios.patch(`${API_BASE_URL}/tasks/iscompletedtask/${taskId}`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      const userId = localStorage.getItem('userId')
      fetchTasks(userId)
    } catch (error) {
      console.error('Error completing task:', error)
      setIsLoading(false)
    }
  }



  const handleDeleteTask = async (taskId) => {
    try {
      setIsLoading(true)
      await axios.delete(`${API_BASE_URL}/tasks/delete/${taskId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      const userId = localStorage.getItem('userId')
      fetchTasks(userId)
    } catch (error) {
      console.error('Error deleting task:', error)
      setIsLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    setIsLoggedIn(false)
    setTasks([])
  }

  const incompleteTasks = tasks.filter(task => !task.completed)
  const completedTasks = tasks.filter(task => task.completed)

  if (!isLoggedIn) {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
        <div className="container mx-auto p-4 dark:bg-gray-800 min-h-screen">
          <h1 className="text-4xl font-bold mb-8 text-center dark:text-white">Task Manager</h1>
          {isSignUp ? (
            <SignUpForm onSignUp={handleSignUp} onSwitchToLogin={() => setIsSignUp(false)} />
          ) : (
            <LoginForm onLogin={handleLogin} onSwitchToSignUp={() => setIsSignUp(true)} />
          )}
          {isLoading && <LoadingSpinner />}
          {showConfirmation && (
            <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
              <div className="bg-white p-8 rounded-lg text-center">
                <h2 className="text-2xl font-bold">Registration Successful!</h2>
                <p className="mt-4">You can now login with your credentials.</p>
                <button 
                  onClick={() => setShowConfirmation(false)} 
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Close
                </button>
              </div>
            </div>
          )}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="fixed bottom-4 right-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700"
          >
            {isDarkMode ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-gray-700" />}
          </button>
        </div>
      </div>
    )
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
        <div className="container mx-auto p-4 dark:bg-gray-800 min-h-screen">
          <h1 className="text-4xl font-bold mb-8 text-center dark:text-white">Task Manager</h1>
          <div className="flex mb-4 space-x-4">
            <button
              onClick={() => setShowTaskForm(true)}
              className="flex-1 flex items-center justify-center p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              <FaPlus className="mr-2" /> Add New Task
            </button>
            <button
              onClick={handleLogout}
              className="flex-1 flex items-center justify-center p-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
            >
              <FaSignOutAlt className="mr-2" /> Logout
            </button>
          </div>
          {showTaskForm && (
            <TaskForm onCreateTask={handleCreateTask} onClose={() => setShowTaskForm(false)} />
          )}
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col md:flex-row justify-between"
            >
              <TaskColumn 
                title="Incomplete Tasks" 
                tasks={incompleteTasks} 
                onMarkComplete={handleMarkCompleteTask} // Pass handleMarkCompleteTask
                onDragComplete={handleCompleteTask} // Pass handleCompleteTask
                onDeleteTask={handleDeleteTask}
              />
              <TaskColumn 
                title="Completed Tasks" 
                tasks={completedTasks} 
                onMarkComplete={() => {}} // No need for mark complete in completed tasks
                onDeleteTask={handleDeleteTask}
              />
            </motion.div>
          )}
        </div>
      </div>
    </DndProvider>
  )
}
