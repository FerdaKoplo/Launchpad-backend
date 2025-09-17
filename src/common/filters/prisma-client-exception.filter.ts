import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from "@nestjs/common";
import { Prisma } from "../../../prisma/generated/prisma";

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter implements ExceptionFilter {
    catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const response = ctx.getRequest()

        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let message = "Internal server error";

        switch (exception.code) {
            case "P2002":
                status = HttpStatus.CONFLICT;
                message = "Unique constraint failed";
                break;
            case "P2025":
                status = HttpStatus.NOT_FOUND;
                message = "Record not found";
                break;
            case "P2003":
                status = HttpStatus.BAD_REQUEST;
                message = "Foreign key constraint failed";
                break;
            default:
                status = HttpStatus.BAD_REQUEST;
                message = "Database error";
                break;
        }

        response.status(status).json({
            statusCode: status,
            error: message,
            timestamp: new Date().toISOString(),
        });
    }
}