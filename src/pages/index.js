import React from 'react';
import Link from '@docusaurus/Link';
import Translate, {translate} from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';

import clsx from 'clsx';

import styles from './index.module.css';


function Home() {
    const {
        siteConfig: {
            customFields: {description},
            tagline,
        },
    } = useDocusaurusContext();
    return (
        <Layout title={tagline}>
            <main>
                <div className={styles.hero}>
                    <div className={styles.heroInner}>
                        <h1 className={styles.heroProjectTagline}>
                            <img
                                alt={translate({message: 'ONCHAINID logo'})}
                                className={styles.heroLogo}
                                src={useBaseUrl('/img/logo.png')}
                            />
                            <span
                                className={styles.heroTitleTextHtml}
                                dangerouslySetInnerHTML={{
                                    __html: translate({
                                        id: 'homepage.hero.title',
                                        message:
                                            'The <b>onchain</b> identity <b>standard</b> documentation ',
                                        description:
                                            'Home page hero title, can contain simple html tags',
                                    }),
                                }}
                            />
                        </h1>
                        <div className={styles.indexCtas}>
                            <Link className="button button--primary" to="/docs/concepts/intro">
                                <Translate>Discover More</Translate>
                            </Link>
                            <Link className="button button--info" to="/docs/developers/intro">
                                <Translate>Start Developing</Translate>
                            </Link>
                            <span className={styles.indexCtasGitHubButtonWrapper}>
                <iframe
                    className={styles.indexCtasGitHubButton}
                    src="https://ghbtns.com/github-btn.html?user=onchain-id&amp;repo=documentation&amp;type=star&amp;count=true&amp;size=large"
                    width={160}
                    height={30}
                    frameBorder="0"
                    title="GitHub Stars"
                />
              </span>
                        </div>
                    </div>
                </div>
                <div className={clsx(styles.announcement, styles.announcementDark)}>
                    <div className={styles.announcementInner}>
                        <Translate
                            values={{
                                OIDLink: (
                                    <Link to="https://www.onchainid.com/token">
                                        <Translate>OID governance token</Translate>
                                    </Link>
                                ),
                            }}>
                            {`Interested about ONCHAINID governance? Learn more about the {OIDLink}`}
                        </Translate>
                    </div>
                </div>
                <div className={styles.section}>
                    <div className="container text--center margin-bottom--xl">
                        <div className="row">
                            <div className="col">
                                <img
                                    className={styles.featureImage}
                                    alt="login"
                                    src={useBaseUrl('/img/login.png')}
                                />
                                <h2 className={clsx(styles.featureHeading)}>
                                    <Translate>Simplify Logins</Translate>
                                </h2>
                                <p className="padding-horiz--md">
                                    <Translate>
                                        Universal login to websites and DeFi protocols, only register for an account once.
                                    </Translate>
                                </p>
                            </div>
                            <div className="col">
                                <img
                                    alt="counterparts"
                                    className={styles.featureImage}
                                    src={useBaseUrl('/img/identify.png')}
                                />
                                <h2 className={clsx(styles.featureHeading)}>
                                    <Translate>Identify Counterparties</Translate>
                                </h2>
                                <p className="padding-horiz--md">
                                    <Translate>
                                        ‍Identify who you are dealing with by checking their proofs verified by trusted parties to avoid frauds and scams.
                                    </Translate>
                                </p>
                            </div>
                            <div className="col">
                                <img
                                    alt="proofs"
                                    className={styles.featureImage}
                                    src={useBaseUrl('/img/proofs.png')}
                                />
                                <h2 className={clsx(styles.featureHeading)}>
                                    <Translate>Reuse Identity Proofs</Translate>
                                </h2>
                                <p className="padding-horiz--md">
                                    <Translate>
                                        Reuse certified identity data (e.g. KYC check certificate) for compliance checks, no more duplicated efforts.
                                    </Translate>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="container text--center">
                        <div className="row">
                            <div className="col">
                                <img
                                    alt="data"
                                    className={styles.featureImage}
                                    src={useBaseUrl('/img/data.png')}
                                />
                                <h2 className={clsx(styles.featureHeading)}>
                                    <Translate>Own Your Data</Translate>
                                </h2>
                                <p className="padding-horiz--md">
                                    <Translate>
                                        Control the access to your personal data and identity proofs. Revoke the access anytime.
                                    </Translate>
                                </p>
                            </div>
                            <div className="col">
                                <img
                                    alt="wallets"
                                    className={styles.featureImage}
                                    src={useBaseUrl('/img/wallets.png')}
                                />
                                <h2 className={clsx(styles.featureHeading)}>
                                    <Translate>Manage Wallets & Assets</Translate>
                                </h2>
                                <p className="padding-horiz--md">
                                    <Translate>
                                        Manage multiple wallets in a single web application. Digital assets can be recovered from a lost wallet to a new one.
                                    </Translate>
                                </p>
                            </div>
                            <div className="col">
                                <img
                                    alt="compliance"
                                    className={styles.featureImage}
                                    src={useBaseUrl('/img/compliance.png')}
                                />
                                <h2 className={clsx(styles.featureHeading)}>
                                    <Translate>Comply with Regulations</Translate>
                                </h2>
                                <p className="padding-horiz--md">
                                    <Translate>
                                        Ensure your eligibility to participate in DeFi investment opportunities to comply with regulations without compromising privacy.
                                    </Translate>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={clsx(styles.section, styles.sectionAlt)}>
                    <div className="container">
                        <div className="row">
                        </div>
                    </div>
                </div>
            </main>
        </Layout>
    );
}

export default Home;
