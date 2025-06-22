import { z } from 'zod';

export const loginRequestSchema = z.object({
  username: z.string().min(1, "Username is required."),
  password: z.string().min(1, "Password is required."),
});

class LoginRequestDto {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }

  validate() {
    const result = loginRequestSchema.safeParse(this.toPlainObject());
    if (!result.success) {
      console.error("Validation errors:", result.error.errors);
    }
    return result;
  }

  toPlainObject() {
    return {
      username: this.username,
      password: this.password,
    };
  }
}

export default LoginRequestDto;