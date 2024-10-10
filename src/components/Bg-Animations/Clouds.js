import sun from '../../assets/Images/sun.png';
import mountain from '../../assets/Images/mountain.png';
import palm from '../../assets/Images/palm.png'

export const Clouds = () => {
    return (
        <section className='lightBg'>
        <div className="cloud-bg">
            <div className="cloud cloud-1"></div>
            <div className="cloud cloud-2"></div>
            <div className="cloud cloud-3"></div>
        </div>
        <div className="sun"><img src={sun} /></div>
        <div className="light-bg"/>
        </section>
    )
}