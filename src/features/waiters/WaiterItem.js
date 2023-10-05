import style from './WaiterItem.module.css'
import { actionRemoveItem, actionSetEditItem } from './store/action'
import { useDispatch } from 'react-redux'
import {  useLang } from '../../hooks/languageContext'

export function WaiterItem ({ waiter }) {
  const lang = useLang()
  const dispatch = useDispatch()

  const onEditBtnClick = () => {
    dispatch(actionSetEditItem(waiter))
  }

  const onDeleteBtnClick = () => {
    dispatch(actionRemoveItem(waiter.id))
  }
    
    return (
      <tr>
        <td>{waiter.firstName}</td>
        <td>{waiter.phone}</td>
        <td>
            <button onClick={onEditBtnClick} className={style.ml10}>{lang === 'en' ? 'Edit' : 'Редагувати'}</button>
            <button onClick={onDeleteBtnClick} className={style.ml10}>{lang === 'en' ? 'Edit' : 'Видалити'}</button>
        </td>
      </tr>
    )
  }


 