//
// cloud-full-stack-kurssi-2-backend
//
// REST API backend esimerkki
//


import { Router }           from 'express'

import todoRoutes           from './todo/index.js'

import { isAuthenticated }  from './auth/auth.service.js'


const router = new Router()

// /api/todo 
router.use('/todo', isAuthenticated, todoRoutes)


export default router
