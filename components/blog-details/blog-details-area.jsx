import BlogSidebar from '../common/blog/blog-sidebar';
import { blogs } from '../../data';
import BlogForm from '../common/form/blog-form';
import Link from 'next/link';

const reviews = [
  {
    img: '/assets/img/blog/comments/avater-1.png',
    name: 'Siarhei Dzenisenka',
    time: '3 Months Ago',
    rating: 4,
  },
  {
    img: '/assets/img/blog/comments/avater-2.png',
    name: 'Julias Roy',
    time: '6 Months Ago',
    rating: 4,
    children: true,
  },
  {
    img: '/assets/img/blog/comments/avater-3.png',
    name: 'Arista Williamson',
    time: '6 Months Ago',
    rating: 4,
  },
]

const BlogDetailsArea = ({ item }) => {
  return <>
    <section className="blog__area pt-55">
      <div className="container">
        <div className="row">
          <div className="col-xl-9 col-lg-8">
            <div className="postbox__title mb-55">
              <h1>
                <Link href={'/blog'}>
                  {item.title}
                </Link>
              </h1>
              <div className="blog__meta">
                <span>By <a href="#">{item.author}</a></span>
                <span>/ {item.date}</span>
              </div>
            </div>
            <div className="postbox__thumb w-img">
              <img src={item.img} alt="" />
            </div>
            <div className="postbox__wrapper mb-70">
              <div className="postbox__text mt-65">
                <p>Entretenir et préserver la beauté des meubles en bois est essentiel pour prolonger leur durée de vie et les garder en bon état . <span className="highlight">Voici quelques conseils pratiques pour vous aider dans cette tâche :

                </span></p>
              </div>
              <div className="postbox__text">
                <p>Nettoyage régulier : Époussetez vos meubles en bois régulièrement à l'aide d'un chiffon doux et sec pour éliminer la poussière et les particules de saleté. Si nécessaire, utilisez un chiffon légèrement humide avec de l'eau tiède pour nettoyer plus en profondeur, mais évitez l'excès d'eau qui pourrait endommager le bois.</p>
              </div>
              <article className="postbox format-quote mt-45 mb-50">
                <div className="postbox__quote">
                  <blockquote>
                    <p> <i className="fas fa-quote-right"></i> Évitez l'exposition directe au soleil : Placez vos meubles en bois loin des sources de chaleur intense et de la lumière directe du soleil, car cela peut entraîner la décoloration et la dégradation du bois. </p>
                  </blockquote>
                </div>
              </article>
              <div className="postbox__details-img w-img mb-60">
                <img src="/assets/img/blog/blog-details-sm.jpg" alt="" />
              </div>
              <div className="postbox__text">
                <p>Utilisez des sous-verres et des dessous de table : Pour protéger la surface des meubles en bois contre les taches et les rayures, utilisez des sous-verres et des dessous de table pour poser des verres, des tasses ou d'autres objets chauds.
                </p>
              </div>
              <div className="postbox__text">
                <p>Évitez les liquides renversés : Si un liquide est renversé sur vos meubles en bois, nettoyez-le immédiatement avec un chiffon absorbant pour éviter toute pénétration dans le bois. N'utilisez pas de produits chimiques agressifs qui pourraient endommager la finition.
                </p>
              </div>
              <div className="postbox__text">
              <p>Utilisez des produits d'entretien appropriés : Choisissez des produits d'entretien spécialement conçus pour les meubles en bois. Évitez les produits contenant des solvants puissants ou de l'ammoniac. Lisez attentivement les instructions avant utilisation et testez toujours le produit sur une petite zone peu visible avant de l'appliquer sur l'ensemble du meuble.
              </p>
            </div>
            <div className="postbox__text">
            <p>Protégez avec de la cire ou un vernis : Pour préserver la beauté du bois et lui donner un aspect lustré, appliquez régulièrement de la cire ou un vernis approprié. Cela aidera à protéger la surface et à prévenir l'usure.
            </p>
            </div>
          <div className="postbox__text">
          <p>Réparez les éraflures et les rayures : Si vos meubles en bois présentent des éraflures ou des rayures légères, utilisez un produit de retouche ou un crayon de cire pour les dissimuler. Pour les dommages plus importants, consultez un professionnel pour les réparations.
          </p>
          </div>
            </div>
            <div className="postbox__share mb-95">
              <div className="row">
                <div className="col-xl-6 col-lg-6 col-md-6">
                  <div className="postbox__social">
                    <span>Share to friends:</span>
                    <ul>
                      <li><a href="#"><i className="fab fa-facebook-f"></i></a></li>
                      <li><a href="#"><i className="fab fa-twitter"></i></a></li>
                      <li><a href="#"><i className="fab fa-dribbble"></i></a></li>
                      <li><a href="#"><i className="fas fa-share-alt"></i></a></li>
                    </ul>
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6">
                  <div className="postbox__tag f-right">
                    <span>Tags :</span>
                    <a href="#">Furniture,</a>
                    <a href="#">Erentheme,</a>
                    <a href="#">Chair, </a>
                    <a href="#">Decor</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="postbox__related-title">
              <h3>You Might Also Like</h3>
            </div>
            <div className="postbox__related-item">
              <div className="row">
                {blogs.slice(0, 2).map((blog, index) => (
                  <div key={index} className="col-xl-6 col-lg-6 col-md-6">
                    <div className="blog__item mb-30">
                      <div className="blog__thumb fix">
                        <Link href={`/blog-details/${blog.id}`} className="w-img">

                          <img src={blog.img} alt="blog" />

                        </Link>
                      </div>
                      <div className="blog__content">
                        <h4>
                          <Link href={`/blog-details/${blog.id}`}>
                            {blog.title}
                          </Link>
                        </h4>
                        <div className="blog__meta">
                          <span>By <a href="#">{blog.auhtor}</a></span>
                          <span>/ {blog.date}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="postbox__line mt-65"></div>
            <div className="postbox__comments pt-90">
              <div className="postbox__comment-title mb-30">
                <h3>Comments (32)</h3>
              </div>
              <div className="latest-comments mb-30">
                <ul>
                  {reviews.map((review, index) => (
                    <li key={index} className={review.children ? 'children' : ''}>
                      <div className="comments-box">
                        <div className="comments-avatar">
                          <img src={review.img} alt="" />
                        </div>
                        <div className="comments-text">
                          <div className="avatar-name">
                            <h5>{review.name}</h5>
                            <span> - {review.time} </span>
                            <a className="reply" href="#">Leave Reply</a>
                          </div>
                          <div className="user-rating">
                            <ul>
                              <li><a href="#"><i className="fas fa-star"></i></a></li>
                              <li><a href="#"><i className="fas fa-star"></i></a></li>
                              <li><a href="#"><i className="fas fa-star"></i></a></li>
                              <li><a href="#"><i className="fas fa-star"></i></a></li>
                              <li><a href="#"><i className="fal fa-star"></i></a></li>
                            </ul>
                          </div>
                          <p>Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for <span>“lorem ipsum”</span> will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose.</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="postbox__line mb-95"></div>
            <div className="post-comments-form mb-100">
              <div className="post-comments-title mb-30">
                <h3>Leave A Reply</h3>
              </div>
              {/* blog form start */}
              <BlogForm />
              {/* blog form start */}
            </div>
          </div>
          <div className="col-xl-3 col-lg-4">
            <BlogSidebar />
          </div>
        </div>
      </div>
    </section>
  </>;
};

export default BlogDetailsArea;
