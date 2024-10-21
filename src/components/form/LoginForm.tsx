import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Login } from "../../api/Login";
import { LoginInput, loginSchema } from "../../schema/AuthSchema";
import {
    useAppDispatch,
    useAppSelector
} from "../../store/Hooks";
import { Button } from "../ui/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/ui/form";
import { Input } from "../ui/ui/input";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.loader.isActive);
  const navigate = useNavigate();

  const form = useForm<LoginInput>({
      resolver: zodResolver(loginSchema),
      defaultValues: {
          email: "",
          password: "",
      },
  });

  const onSubmit = async (data: LoginInput) => {
      try {
          const resultAction = await dispatch(Login(data));
          if (Login.fulfilled.match(resultAction)) {
              navigate("/dashboard");
          } else {
              console.error("Login failed:", resultAction.error);
          }
      } catch (error) {
          console.error("Login failed:", error);
      }
  };


  return (
    <Form {...form}>
      <form className="space-y-24" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email ID</FormLabel>
                <FormControl>
                  <Input
                    className="ring-ring h-10 border border-input bg-background px-3 py-2 text-sm ring-offset-background file:bottom-0 placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    {...field}
                    type="email"
                    placeholder="Enter your email"
                    // disabled={otpSent}
                  />
                </FormControl>
                <FormMessage className="text-destructive" />
              </FormItem>
            )}
          />

            
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      className="ring-ring h-10 border border-input bg-background px-3 py-2 text-sm ring-offset-background file:bottom-0 placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      {...field}
                      type="password"
                      placeholder="Enter your Password"
                      // maxLength={4}
                    />
                  </FormControl>
                  <FormMessage className="text-destructive" />
                </FormItem>
              )}
            />
        
        </div>
        <Button
          disabled={!form.formState.isValid || isLoading}
          className="transition-all flex justify-center items-center w-full bg-primary text-background py-2 whitespace-nowrap font-medium px-4 hover:bg-primary/90 h-10 rounded-md text-sm"
        >
          <svg
            className={
              isLoading
                ? `animate-spin -ml-1 mr-3 h-5 w-5 text-white`
                : 'hidden'
            }
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Login
        </Button>
        
      </form>
    </Form>
  );
}
