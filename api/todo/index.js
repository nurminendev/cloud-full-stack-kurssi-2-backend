//
// cloud-full-stack-kurssi-2-backend
//
// REST API backend esimerkki
//


import { Router }           from 'express'

import * as controller      from './todo.controller.js'


const router = new Router()


router.get(    '/',     controller.index)
router.post(   '/',     controller.create)
router.patch(  '/:id',  controller.patch)
router.delete( '/:id',  controller.destroy)


export default router
