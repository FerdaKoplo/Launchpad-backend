import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class RefreshTokenDTO {
  @ApiProperty({ example: 'your_refresh_token_here' })
  @IsString({ message: 'Refresh token must be a string' })
  refreshToken: string;
}
