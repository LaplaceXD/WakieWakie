import { Gender, Interest } from "@/__generated__/gql";
import { auth, db } from "@/database";
import { eq } from "drizzle-orm";
import { z } from "zod";

/**
 * Formats a text to sentence case,
 *
 * @param s The string to be formatted.
 * @return The formatted string.
 */
function sentenceCase(s: string) {
  const trimmedAndSpaced = s.trim().replace(/\s+/g, " ");
  const sentenceCased = trimmedAndSpaced
    .split(" ")
    .map(s => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase())
    .join(" ");

  return sentenceCased;
}

export const userSchema = z.object({
  email: z
    .string()
    .trim()
    .email()
    .refine(async value => {
      const [result] = await db.select().from(auth).where(eq(auth.email, value));
      return !result;
    }, "Email is already in use."),
  username: z
    .string()
    .min(2)
    .max(24)
    .regex(/[A-Za-z0-9_]+/, "Username must only contain alphanumeric characters and underscores.")
    .refine(async value => {
      const [result] = await db.select().from(auth).where(eq(auth.username, value));
      return !result;
    }, "Username is already in use."),
  password: z
    .string()
    .min(1)
    .min(8, "Password must at least have 8 characters")
    .regex(
      /**
       * ^                         Start anchor
       * (?=.*[A-Z])               Ensure string has one uppercase letter.
       * (?=.*[!@#$&*])            Ensure string has one special character.
       * (?=.*[0-9])               Ensure string has one digit.
       * (?=.*[a-z])               Ensure string has one lowercase letter.
       * .{8,}                     Ensure string is at least a length of 8.
       * $                         End anchor
       */
      /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,}$/,
      "Password must at least contain one uppercase letter, one lowercase letter, a digit, and a special character (!@#$&*).",
    ),
  firstName: z
    .string()
    .trim()
    .min(1)
    .max(256)
    .regex(
      /**
       * ^                                            Start anchor
       * [a-zA-Z]                                     Ensure string starts with an alpha character.
       * (\s*[^!@#$%^&*|:<>,.?~`_={};+()[\]\-\\]+)*   Ensure string does not contain invalid characters, but can contain spaces.
       * $                                            End anchor
       */
      /^[a-zA-Z](\s*[^!@#$%^&*|:<>,.?~`_={};+()[\]\-\\]+)*$/,
      "First name contains invalid characters.",
    )
    .transform(sentenceCase),
  lastName: z
    .string()
    .trim()
    .max(256)
    .refine(val => {
      /**
       * ^                                            Start anchor
       * [a-zA-Z]                                     Ensure string starts with an alpha character.
       * (\s*[^!@#$%^&*|:<>,.?~`_={};+()[\]\-\\]+)*   Ensure string does not contain invalid characters, but can contain spaces.
       * $                                            End anchor
       */
      const regex = /^[a-zA-Z](\s*[^!@#$%^&*|:<>,.?~`_={};+()[\]\-\\]+)*$/;

      return !val || regex.test(val);
    }, "Last name contains invalid characters.")
    .transform(sentenceCase)
    .optional()
    .default(""),
  bio: z
    .string()
    .trim()
    .min(1)
    .max(256)
    .nullable()
    .transform(v => v || "")
    .optional()
    .default(""),
  gender: z.enum([Gender.Male, Gender.Female, Gender.Others]),
  interest: z.enum([Interest.Male, Interest.Female, Interest.Everyone]),
  city: z
    .string()
    .trim()
    .max(256)
    .nullable()
    .transform(v => (v ? sentenceCase(v) : ""))
    .optional()
    .default(""),
  country: z.string().min(3).max(256).transform(sentenceCase),
  alarmTime: z.string().regex(
    /**
     * ^                              Start anchor
     * ([01]\d|2[0-3])                Hour ranging from 00-23
     * :                              Separator for HH:mm
     * ([0-5]\d)                      Minutes ranging from 00-59
     * :                              Separator for mm:ss
     * ([0-5]\d)                      Seconds ranging from 00-59
     * ([+-]\d{1,4})?                 Optional timezone offset
     * $                              End anchor
     */
    /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)([+-]\d{1,4})?$/,
    "Alarm time should be in the following format HH:mm:ss+ZZZZ (military time).",
  ),
});
