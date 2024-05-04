import Enquiry from "../models/enqiryModel.js";
import Contact from "../models/ContactDetails.js";

// GET all enquiries
export const getAllEnquiries = async (req, res) => {
  try {
    const { role, permissions } = req.user;
    if (!(role === "admin")) {
      return res.status(403).json({
        error: "Sorry! You are not authorized to perform this action.",
      });
    }
    const enquiries = await Enquiry.find();
    res.status(200).json({ success: true, enquiries: enquiries });
  } catch (error) {
    console.error("Error fetching enquiries:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// GET a single enquiry by ID
export const getEnquiryById = async (req, res) => {
  try {
    const { role, permissions } = req.user;
    if (!(role === "admin")) {
      return res.status(403).json({
        error: "Sorry! You are not authorized to perform this action.",
      });
    }
    const enquiry = await Enquiry.findById(req.params.id);
    if (!enquiry) {
      return res.status(404).json({ error: "Enquiry not found" });
    }
    res.status(200).json({ success: true, enquiry: enquiry });
  } catch (error) {
    console.error("Error fetching enquiry by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// POST a new enquiry
export const createEnquiry = async (req, res) => {
  try {
    const { role, permissions } = req.user;
    if (!(role === "admin")) {
      return res.status(403).json({
        error: "Sorry! You are not authorized to perform this action.",
      });
    }
    const userId = req.user._id;
    const { email, enquiry_name, service_type } = req.body;

    const enquiry = await Enquiry.create({
      user: userId,
      email: email,
      enquiry_name: enquiry_name,
      service_type: service_type,
    });
    res.status(201).json(enquiry);
  } catch (error) {
    console.error("Error creating enquiry:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// PUT/update an existing enquiry by ID
export const updateEnquiryById = async (req, res) => {
  try {
    const { role, permissions } = req.user;
    if (!(role === "admin")) {
      return res.status(403).json({
        error: "Sorry! You are not authorized to perform this action.",
      });
    }
    const enquiry = await Enquiry.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!enquiry) {
      return res.status(404).json({ error: "Enquiry not found" });
    }
    res.status(200).json(enquiry);
  } catch (error) {
    console.error("Error updating enquiry by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// DELETE an enquiry by ID
export const deleteEnquiryById = async (req, res) => {
  try {
    const { role, permissions } = req.user;
    if (!(role === "admin")) {
      return res.status(403).json({
        error: "Sorry! You are not authorized to perform this action.",
      });
    }
    const enquiry = await Enquiry.findByIdAndDelete(req.params.id);
    if (!enquiry) {
      return res.status(404).json({ error: "Enquiry not found" });
    }
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting enquiry by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


// POST a new enquiry
export const createContact = async (req, res) => {
  try {
    const { name, email, phonenumber, message } = req.body;

    const enquiry = await Contact.create({
      name: name,
      email: email,
      phonenumber: phonenumber,
      message: message
    });

    res.status(201).json(enquiry);
  } catch (error) {
    console.error("Error creating enquiry:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
