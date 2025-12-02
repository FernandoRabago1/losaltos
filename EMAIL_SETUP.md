# Email Configuration Setup Guide

This guide will help you configure the contact form to send emails to your Gmail account.

## Steps to Set Up Gmail App Password

1. **Enable 2-Factor Authentication on your Gmail account**
   - Go to https://myaccount.google.com/security
   - Enable 2-Step Verification if not already enabled

2. **Generate an App Password**
   - Visit https://myaccount.google.com/apppasswords
   - Select app: "Mail"
   - Select device: "Other (Custom name)" - name it "Architecture Portfolio"
   - Click "Generate"
   - Google will show you a 16-character password (example: `abcd efgh ijkl mnop`)

3. **Update your .env file**
   - Open `.env` file in your project root
   - Replace `GMAIL_USER` with your Gmail address (e.g., `myemail@gmail.com`)
   - Replace `GMAIL_APP_PASSWORD` with the 16-character password (remove spaces)
   
   Example:
   ```
   GMAIL_USER="losaltos@gmail.com"
   GMAIL_APP_PASSWORD="abcdefghijklmnop"
   ```

4. **Test the Contact Form**
   - Restart your development server: `pnpm dev`
   - Go to http://localhost:3000/contact
   - Fill out the form and submit
   - Check your Gmail inbox for the message

## Production Deployment

When deploying to production (e.g., Vercel, Netlify):

1. Add these environment variables in your hosting platform:
   - `GMAIL_USER`
   - `GMAIL_APP_PASSWORD`
   - `AUTH_URL` (set to your production URL)
   - `NEXT_PUBLIC_SITE_URL` (your production URL)

2. Update `DATABASE_URL` if using a production database

## Troubleshooting

- **"Invalid credentials" error**: Double-check your Gmail address and App Password
- **"Less secure app" warning**: Use App Password, not your regular Gmail password
- **Emails not arriving**: Check your spam folder
- **Port 465 blocked**: Gmail uses port 465 for secure SMTP

## Security Notes

- Never commit your `.env` file to version control
- `.env` is already in `.gitignore`
- Use `.env.example` as a template for production setup
- Each environment (dev, staging, prod) should have its own `.env` file
