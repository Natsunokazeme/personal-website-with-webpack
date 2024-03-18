import React, {DragEvent} from "react"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import "./DragSortList.scss"

interface DragSortListProps {
  lists: ListItemType[]
}

interface ListItemType {
  id: string
  value: string
  sort: number
}

const DragSortList: React.FC = () => {
  const [lists, setLists] = React.useState([
    {id: "1", value: "1", sort: 1},
    {id: "2", value: "2", sort: 2},
    {id: "3", value: "3", sort: 3},
    {id: "4", value: "4", sort: 4},
    {id: "5", value: "5", sort: 5},
  ])

  const curDragItem = React.useRef<ListItemType | null>(null)

  const handleDragStart = (e: DragEvent<HTMLUListElement>) => {
    // e.preventDefault()
    e.dataTransfer.effectAllowed = "move"
    console.log("drag start")
    const target = e.target as HTMLLIElement
    curDragItem.current = lists.find((list) => list.id === target.id) || null
    setTimeout(() => {
      target.classList.add("dragging")
    }, 0)
  }

  const handleDragEnd = (e: DragEvent<HTMLUListElement>) => {
    // e.preventDefault()
    const target = e.target as HTMLLIElement
    target.classList.remove("dragging")
    console.log("drag over")
    console.log(target)
  }

  const handleDragOver = (e: DragEvent<HTMLUListElement>) => {
    e.preventDefault()
    // const target = e.target as HTMLLIElement
    console.log("drag over")
    // console.log(target)
  }

  const handleDrop = (e: DragEvent<HTMLElement>) => {
    e.preventDefault()
    console.log("drop")
    const target = e.target as HTMLElement
    setLists((prev) => {
      const newList = [...prev]
      const dragIndex = newList.findIndex(
        (list) => list.id === curDragItem.current?.id
      )
      const dropIndex = newList.findIndex((list) => list.id === target.id)
      newList.splice(dragIndex, 1)
      newList.splice(dropIndex, 0, curDragItem.current as ListItemType)
      return newList
    })
    console.log(target)
  }

  return (
    <div className='drag-sort-list-wrapper'>
      <List
        onDragStart={(e) => handleDragStart(e)}
        onDragEnd={(e) => handleDragEnd(e)}
        onDragOver={(e) => handleDragOver(e)}
        onDrop={(e) => handleDrop(e)}
        draggable='true'
      >
        {lists.map((list) => {
          return (
            <ListItem key={list.id} id={list.id} draggable='true'>
              {list.value}
            </ListItem>
          )
        })}
      </List>
    </div>
  )
}
export default DragSortList
