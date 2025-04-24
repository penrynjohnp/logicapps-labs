import { ReactNode } from 'react';
import  TypewriterComponent  from '../TypewriterComponent';
import ImageRotator from '../ImageRotator';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';
// import LearnerSVG from '../../../static/img/learner2.svg';


const keywords = [
    'Intelligent workflows',
    'Workflow orchestration',
    'Business Process Automation',
    'Enterprise Integration',
    'Azure Integration Services',
    'Azure Logic Apps',
  ];

  interface LandingpageFeaturesProps {
    images: string[];
  }  


export default function LandingpageFeatures({ images }: LandingpageFeaturesProps): ReactNode {
    return (
        //<section className={styles.largetext}>    
            <div className='container no-sidebar'>
                <div className="row">
                   <img className={styles.logo} src={require('../../../static/img/aks-logo-dark.png').default}  alt="Logic Apps Labs logo"  />
                </div>
                <div className='row'>
                    <div className='col col--6'>
                        <div className="row">
                            <div className={styles.largetext}>
                                Hands-on tutorials to <span className={styles.bluetext}>learn</span> <br />
                                and <span className={styles.bluetext}>teach</span> <TypewriterComponent words={keywords} />
                            </div>
                        </div>
                        <div className="row">
                            <div className={`${styles.subtitle}`}> 
                                Grab-and-go resources to help you learn new skills but also <a href="./contributing">contribute</a> your own workshop to help others in their Azure Logic Apps learning journey.
                            </div>
                        </div>
                        <div className='row'>
                            <div className='{styles.buttons}'>
                                <Link 
                                    className="button button--lg button--primary"
                                    to="/docs/intro">
                                    Browse Workshops
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className='col col--6'>
                        {/* <img className={styles.img450x450} src={require('../../../static/img/learner2.png').default} /> */}
                        {/* <LearnerSVG className={styles.img450x450} /> */}
                        <div className={styles.img450x450}>
                            <ImageRotator images={images} />
                        </div>
                    </div>
                </div>
            </div>
        //</section>
    )
}
