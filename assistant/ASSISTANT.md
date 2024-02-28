# Sales Assistant Documentation

## Integrating Sales Assistant into Your Online Store

The Sales Assistant is a tool designed to enhance customer interaction in your online store by providing support and additional information about the products or services offered. This documentation provides a guide to integrate and configure the Sales Assistant in your store, ensuring a positive experience for your customers.

---

### Integration Options

You can choose from the following integration options for the Sales Assistant:

1. **Manual Integration:**
   - For a customized integration with full control over changes, follow the detailed instructions for copying, customizing, and configuring the necessary files.

2. **Patch File Integration:**
   - Use a pre-prepared patch file provided by the template storefront for a quick and easy integration. Simply apply the patch and follow the provided instructions.

Choose the option that best suits your needs and follow the corresponding instructions below to integrate the Sales Assistant into your online store.

---

### Manual Integration

1. **Copy Necessary Files:**
   - From the official template storefront repository (https://github.com/deco-sites/storefront/), copy the `shop-assistant` folder from the `components` directory to your store's `components` directory.
   - Paste the `Chat.tsx` file from the `sections` directory into your store's `sections` directory.
   - Paste the `Chat.tsx` file from the `islands` directory into your store's `islands` directory.

2. **Customize Chat Name:**
   - In the `Chat.tsx` file, update the chat name in the WebSocket call. Replace `name` with the name of your Brand Assistant.

```typescript
ws.value = new WebSocket(
  `${websocket}://${host}/live/invoke/ai-assistants/actions/chat.ts?assistant=name`
);
```

3. **Add `SendEventOnView` Function:**
   - Copy the `SendEventOnView` function from the `$store/sdk/analytics.tsx` file, and paste it into your own `$store/sdk/analytics.tsx` file. This function is essential for accurately tracking interactions with the Sales Assistant. Ensure that you include this function in your analytics setup to monitor user interactions effectively.

4. **Incorporate Custom Icons:**
   - Copy the required icons from the `sprites.svg` file and paste them into your own `sprites.svg` file. Then, insert the corresponding IDs in the `Icon.tsx` file. The required icons include Camera, Close, and Microphone. Make sure to associate each icon with its respective ID in the `Icon.tsx` file for proper rendering and functionality.

5. **Configure Theme in Tailwind:**
   - In the `tailwind.config.js` file, add configurations to customize the chat colors.

```javascript
theme: {
    colors: {
      chatPrimary: "var(--primary-color-hex)",
      chatSecondary: "var(--secondary-color-hex)",
      chatTertiary: "var(--tertiary-color-hex)",
      chatLogo: "var(--logo-color-hex)",
      opaqueWhite: "var(--opaque-white)",
    }
  },
```

### Patch File Integration

1. **Obtain Patch File:**
   - Access the official template storefront repository and obtain the `sales-assistant.patch` file from the `assistant` folder.
   - Save the patch file in the root directory of your online store project.

2. **Apply Patch:**
   - Use the following command to apply the patch to your local repository:
     ```bash
     git apply --3way sales-assistant.patch
     ```
   - Verify that the patch has been applied correctly and review the changes.

3. **Compile Code:**
   - Run the `deno task build` command, ensuring that all dependencies are installed and the code is prepared for execution.

4. **Start the Server:**
   - Finally, execute the `deno task start` command to start the server and make the Sales Assistant available for interaction.

## Additional Notes

- Be sure to carefully review the necessary settings and customizations for the Sales Assistant, adapting them to the specific needs of your store.
- Always test the Sales Assistant integration after configuration to ensure everything functions as expected before making it available to customers.

### Configuration in Admin Dashboard

1. **Create the Brand Assistant Hub:**
   - Navigate to the "Apps" section in the admin panel and search for "assistant." Select the option to create the Brand Assistant Hub.

2. **Create the AI Assistant Hub:**
   - Similarly, navigate to the "Apps" section in the admin panel and search for "assistant." This time, select the option to create the AI Assistant Hub.

3. **Configure the AI Assistant:**
   - Within the AI Assistant Hub app, fill in the assistant ID and click on "Add Assistants" to proceed with adding a new assistant. Select the newly created assistant and specify its name, which will be referenced in the `${websocket}://${host}/live/invoke/ai-assistants/actions/chat.ts?assistant=assistantName` URL on Chat.tsx file. Optionally, provide a welcome message if needed. Complete the setup by clicking on "Create" to generate the block and publish it.

4. To insert the chat globally, go to "Apps", create a `site.ts` application or open an existing one, and navigate to "Global Sections". Add the chat as a section, customize and publish it.

### Additional Notes

- If the assistant options within the AI Assistant application are not fully displayed, it may be necessary to publish the store version containing the chat and access the admin through the published version.

- Within "Assistants-0", select "Brand Assistant".

- Fill out the category tree and top searches.

### Environment Variable Configuration

It's necessary to configure some environment variables. Use the keys below to set the necessary variables, both locally and in the environment variables in Deno Dash:

```bash
export OPENAI_API_KEY=
export UPLOAD_BUCKET=
export AWS_ACCESS_KEY_ID=
export AWS_SECRET_ACCESS_KEY=
export AWS_REGION=
```