import { Router } from "express";
import authenticate from "../middleware/auth.js";
import { getAllEnquiries, createEnquiry, getEnquiryById, updateEnquiryById, deleteEnquiryById,createContact } from "../controllers/enquiryController.js";

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

/** POST a new enquiry */
router.post('/createContact', createContact);

export default router;
