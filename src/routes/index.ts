import { Router } from "express";
import { authRouter } from "./authRouter";
import { typeInvoiceRouter } from "./admin/type_invoice";
import { invoiceRouter } from "./admin/invoice";
import { customerInvoiceRouter } from "./customer/invoice";
import usersRouter from './users';

const router = Router();

router.use("/auth", authRouter);
router.use("/admin/type_invoice", typeInvoiceRouter);
router.use("/admin/invoice", invoiceRouter);
router.use("/customer/invoice", customerInvoiceRouter);
router.use('/users', usersRouter)

export default router;
