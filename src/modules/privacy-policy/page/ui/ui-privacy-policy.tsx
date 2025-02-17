import styles from "./index.module.css";

const UIPolicyPrivacy = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Privacy Policy of ChatRender.com</h1>
      
      <section className={styles.section}>
        <h2 className={styles.subtitle}>1. Introduction</h2>
        <p>At <strong>ChatRender.com</strong>, we value your privacy and are committed to protecting your personal data. This policy explains how we collect, use, and protect your information when using our services.</p>
        <p>This policy complies with privacy regulations applicable in **Mexico** and other countries where we operate, including the **Federal Law on Protection of Personal Data Held by Private Parties (LFPDPPP)** and the **General Data Protection Regulation (GDPR)** of the European Union, among other international standards.</p>
      </section>
      
      <section className={styles.section}>
        <h2 className={styles.subtitle}>2. Information We Collect</h2>
        <ul>
          <li><strong>Email Address:</strong> Requested for account creation and access.</li>
          <li><strong>OTP (One-Time Password):</strong> Generated and stored temporarily for authentication.</li>
          <li><strong>Account Creation Date:</strong> Recorded upon the first successful authentication.</li>
          <li><strong>Last Login Date:</strong> Updated each time the user successfully logs in with an OTP.</li>
          <li><strong>Total Login Count:</strong> Starts at 1 with the first successful login and increments on each subsequent authentication.</li>
        </ul>
      </section>
      
      <section className={styles.section}>
        <h2 className={styles.subtitle}>3. Use of Cookies</h2>
        <p>We use <strong>only strictly necessary cookies</strong> for user authentication. These cookies:</p>
        <ul>
          <li>Contain an authentication token generated upon a successful login.</li>
          <li>Are stored <strong>securely via HTTPS</strong>.</li>
          <li>Are automatically deleted upon logging out.</li>
          <li>Are not used for tracking, advertising, or analytics.</li>
          <li>Are not shared with third parties.</li>
        </ul>
      </section>
      
      <section className={styles.section}>
        <h2 className={styles.subtitle}>4. International Data Transfers</h2>
        <p>Due to the global nature of our services, the information we collect may be stored and processed on servers located in different countries. We ensure that any data transfer complies with applicable legal requirements and maintains an adequate level of data protection.</p>
      </section>
      
      <section className={styles.section}>
        <h2 className={styles.subtitle}>5. Data Sharing</h2>
        <p>We do not share your data with third parties, except when necessary for legal compliance or service improvement. If we need to share data with third parties, we will notify you in advance and request your consent when required.</p>
      </section>
      
      <section className={styles.section}>
        <h2 className={styles.subtitle}>6. Data Security</h2>
        <p>We implement technical and organizational measures to protect your information against unauthorized access, loss, or alterations. Account access is secured through OTP authentication and secure token storage.</p>
      </section>
      
      <section className={styles.section}>
        <h2 className={styles.subtitle}>7. User Rights</h2>
        <p>You have the right to access, rectify, restrict use, or request the deletion of your personal data in accordance with applicable laws.</p>
        <p>You can request the deletion of your account by contacting us at <strong>zlayerz.dev@gmail.com</strong>. If you wish to exercise any of these rights or have concerns about how we handle your information, please reach out to us.</p>
      </section>
      
      <section className={styles.section}>
        <h2 className={styles.subtitle}>8. Changes to the Policy</h2>
        <p>We reserve the right to update this policy at any time. We will notify you of any significant changes through our official channels.</p>
      </section>
      
      <p className={styles.footer}>If you have any questions about our privacy policy, please do not hesitate to contact us.</p>
    </div>)
};

export { UIPolicyPrivacy };
