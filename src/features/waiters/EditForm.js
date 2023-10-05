import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actionSaveItem } from './store/action'
import { Formik, Form, Field, useFormikContext } from 'formik'
import * as Yup from 'yup';
import { ValidationError } from '../../components/ValidationError'
import style from './WaiterItem.module.css';



const validationSchema = Yup.object({
  firstName: Yup.string().min(3).required(),
  phone: Yup.string()
    .matches(/^[0-9-]*$/, 'Phone number can only contain digits and dashes')
    .matches(/^(?:[0-9]{3}-[0-9]{3}-[0-9]{2}|[0-9]{5}[0-9]{3})$/, 'Invalid phone format. Use xxx-xxх-xx or xxxxxхxx')
    .required('Phone number is required'),
});


  export function EditForm () {
  const dispatch = useDispatch()
  const editingWaiter = useSelector((state) => state.waiter.editingWaiter)

  const onSubmit = (values, { resetForm }) => {
    const formWaiter = {
      ...editingWaiter,
      ...values,
    }

    dispatch(actionSaveItem(formWaiter))
    resetForm()
  }


  return (
    <Formik
      enableReinitialize
      initialValues={editingWaiter}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      <Form>
        <div>
          <label htmlFor="firstName">First Name</label>
          <Field type="text" name="firstName" />
          <ValidationError name="firstName" />
        </div>

        <div>
          <label htmlFor="phone">Phone</label>
          <Field type="text" name="phone" />
          <ValidationError name="done" />
        </div>

        <SaveButton className={style.ml10}/>
      </Form>
    </Formik>
  )
}

function SaveButton () {
  const { isValid } = useFormikContext()

  return <button disabled={!isValid} type="submit">Save</button>
}
