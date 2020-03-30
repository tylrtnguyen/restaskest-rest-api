import {
      Router
} from 'express'
import {
      uploadAndSave,
      getAllPayroll,
      deletePayroll,
      updatePayroll,
      findPayrollByEmpId
} from './payroll.controllers'
import {
      upload
} from '../../config/multer.config'

const router = Router();


router.route('/upload')
      .post(upload.single("file"), uploadAndSave)

router.route('/all')
      .get(getAllPayroll)

router.route('/:id')
      .delete(deletePayroll)
      .put(updatePayroll)

router.route('/emp/:id')
      .get(findPayrollByEmpId)

export default router