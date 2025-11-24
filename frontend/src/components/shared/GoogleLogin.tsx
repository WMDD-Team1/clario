import { useEffect } from 'react';

function GoogleLoginButton() {
  // @ts-ignore
  /* global google */

  useEffect(() => {
    // @ts-ignore
    if (window.google) {
      // @ts-ignore
      window.google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        callback: handleCredentialResponse,
      });

      // @ts-ignore
      window.google.accounts.id.renderButton(document.getElementById('googleSignInDiv'), {
        theme: 'outline',
        size: 'large',
        text: 'signin_with',
        shape: 'rectangular',
      });
    }
  }, []);

  const handleCredentialResponse = (response: any) => {
    console.log('Google token:', response.credential);
  };

  return <div id="googleSignInDiv"></div>;
}

export default GoogleLoginButton;
