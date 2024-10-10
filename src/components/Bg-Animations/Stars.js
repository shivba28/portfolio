import moon from '../../assets/Images/moon.png';
import trees from '../../assets/Images/trees-m.webp';

export const Stars = () => {
    return (
        <section className='darkBg'>
        <div className="star-bg">
            <span className="shooting-star"></span>
            <span className="shooting-star shooting-star2"></span>
            <span className="star star1"></span>
            <span className="star star2"></span>
            <span className="star star3"></span>
            <span className="star star4"></span>
            <span className="star star5"></span>
            <span className="star star6"></span>
            <span className="star star7"></span>
            <span className="star star8"></span>
            <span className="star star9"></span>
            <span className="star star10"></span>
            <span className="star star11"></span>
            <span className="star star12"></span>
            <span className="star star13"></span>
        </div>
        <div className="moon"><img src={moon} /></div>
        <img className="dark-bg" src={trees}/>
        </section>
    )
}