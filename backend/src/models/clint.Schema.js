import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
			maxlength: 100,
		},
		email: {
			type: String,
			required: true,
			trim: true,
			lowercase: true,
			maxlength: 254,
		},
		phone: {
			type: String,
			trim: true,
			maxlength: 30,
			default: "",
		},
		company: {
			type: String,
			trim: true,
			maxlength: 160,
			default: "",
		},
		projectType: {
			type: String,
			required: true,
			enum: ["mobile_app", "web_platform", "custom_erp", "ecommerce", "other"],
		},
		budget: {
			type: String,
			enum: ["under_5l", "5l_15l", "15l_50l", "50l_plus", "not_sure"],
			default: undefined,
		},
		description: {
			type: String,
			required: true,
			trim: true,
			minlength: 20,
			maxlength: 5000,
		},
		status: {
			type: String,
			enum: ["new", "reviewed", "contacted", "closed"],
			default: "new",
		},
	},
	{ timestamps: true },
);

contactSchema.index({ status: 1, createdAt: -1 });

const ContactInquiry =
	mongoose.models.ContactInquiry ||
	mongoose.model("ContactInquiry", contactSchema, "contact_inquiries");

export default ContactInquiry;
