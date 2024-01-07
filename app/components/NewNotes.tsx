import styles from './NewNotes.css';
import { Form , useActionData, useNavigation } from '@remix-run/react';

function NewNote() {
  const navigation = useNavigation();
  const actionData = useActionData();
  
  const isSubmitting = navigation.state === 'submitting';
  return (
    <Form method="post" id="note-form">
      
      <p>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" name="title"  />
      </p>
      {actionData?.message && <p className="error">{actionData.message}</p>}
      <p>
        <label htmlFor="content">Content</label>
        <textarea id="content" name="content" rows={5}  />
      </p>
      <div className="form-actions">
        <button disabled={isSubmitting}>{isSubmitting ? 'Adding...' : 'Add Note'}</button>
      </div>
    </Form>
  );
}

export default NewNote;

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}