import { Router } from "express";
import authenticate from "../middleware/auth.js";
import { getAllEnquiries, createEnquiry, getEnquiryById, updateEnquiryById, deleteEnquiryById } from "../controllers/enquiryController.js";

const router = Router();

/** GET all enquiries */
router.get('/enquiries', authenticate, getAllEnquiries);

/** GET a single enquiry by ID */
router.get('/enquiries/:id', authenticate, getEnquiryById);

/** POST a new enquiry */
router.post('/enquiries',authenticate, createEnquiry);

/** PUT/update an existing enquiry by ID */
router.put('/enquiries/:id', authenticate, updateEnquiryById);

/** DELETE an enquiry by ID */
router.delete('/enquiries/:id', authenticate, deleteEnquiryById);

export default router;
