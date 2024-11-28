// import { useDrop } from 'react-dnd'
// import TaskItem from './task-item'

// export default function TaskColumn({ title, tasks, onDragComplete, onDeleteTask }) {
//   const [{ isOver }, drop] = useDrop({
//     accept: 'TASK',
//     drop: (item) => onDragComplete(item.id),
//     collect: (monitor) => ({
//       isOver: !!monitor.isOver(),
//     }),
//   })

//   return (
//     <div
//       ref={drop}
//       className={`w-full md:w-[48%] p-4 rounded-lg ${
//         isOver ? 'bg-gray-200 dark:bg-gray-700' : 'bg-gray-100 dark:bg-gray-800'
//       } transition-colors`}
//     >
//       <h2 className="text-2xl font-semibold mb-4 dark:text-white">{title}</h2>
//       <div className="space-y-4">
//         {tasks.map((task) => (
//           <TaskItem key={task._id} task={task} onDelete={onDeleteTask} />
//         ))}
//       </div>
//     </div>
//   )
// }

import { useDrop } from 'react-dnd'
import TaskItem from './task-item'

export default function TaskColumn({ title, tasks, onDragComplete, onDeleteTask, onMarkComplete }) {
  const [{ isOver }, drop] = useDrop({
    accept: 'TASK',
    drop: (item) => onDragComplete(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(), 
    }),
  })

  return (
    <div
      ref={drop}
      className={`w-full md:w-[48%] p-4 rounded-lg ${
        isOver ? 'bg-gray-200 dark:bg-gray-700' : 'bg-gray-100 dark:bg-gray-800'
      } transition-colors`}
    >
      <h2 className="text-2xl font-semibold mb-4 dark:text-white">{title}</h2>
      <div className="space-y-4">
        {tasks.map((task) => (
          <TaskItem 
            key={task._id} 
            task={task} 
            onDelete={onDeleteTask} 
            onMarkComplete={onMarkComplete} // Pass onMarkComplete to TaskItem
          />
        ))}
      </div>
    </div>
  )
}
