import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addStudent } from "../../redux/actions/usersAction";
import PGNav from "./navbar";

const Editor = () => {
  const dispatch = useDispatch();

  const { register, handleSubmit } = useForm();
  const addContent = (body) => 
    {
        dispatch(addContent(body))
    }

  return (
    <>
      <div id="app">
        <div class="main-wrapper main-wrapper-1">
          <div class="navbar-bg"></div>

          <nav class="navbar navbar-expand-lg main-navbar">
            <form class="form-inline mr-auto" >
              <ul class="navbar-nav mr-3">
                <li>
                  <a
                    href="#"
                    data-toggle="sidebar"
                    class="nav-link nav-link-lg"
                  >
                    <i class="fas fa-bars"></i>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    data-toggle="search"
                    class="nav-link nav-link-lg d-sm-none"
                  >
                    <i class="fas fa-search"></i>
                  </a>
                </li>
              </ul>
              <div class="search-element">
                <input
                  class="form-control"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  data-width="250"
                />
                <button class="btn" type="submit">
                  <i class="fas fa-search"></i>
                </button>
                <div class="search-backdrop"></div>
                <div class="search-result">
                  <div class="search-header">Histories</div>
                  <div class="search-item">
                    <a href="#">How to Used HTML in Laravel</a>
                    <a href="#" class="search-close">
                      <i class="fas fa-times"></i>
                    </a>
                  </div>
                  <div class="search-item">
                    <a
                      href="https://themeforest.net/user/admincraft/portfolio"
                      target="_black"
                    >
                      Admincraft Portfolio
                    </a>
                    <a href="#" class="search-close">
                      <i class="fas fa-times"></i>
                    </a>
                  </div>
                  <div class="search-item">
                    <a href="#">#CodiePie</a>
                    <a href="#" class="search-close">
                      <i class="fas fa-times"></i>
                    </a>
                  </div>
                  <div class="search-header">Result</div>
                  <div class="search-item">
                    <a href="#">
                      <img
                        class="mr-3 rounded"
                        width="30"
                        src="assets/img/products/product-3-50.png"
                        alt="product"
                      />
                      oPhone 11 Pro
                    </a>
                  </div>
                  <div class="search-item">
                    <a href="#">
                      <img
                        class="mr-3 rounded"
                        width="30"
                        src="assets/img/products/product-2-50.png"
                        alt="product"
                      />
                      Drone Zx New Gen-3
                    </a>
                  </div>
                  <div class="search-item">
                    <a href="#">
                      <img
                        class="mr-3 rounded"
                        width="30"
                        src="assets/img/products/product-1-50.png"
                        alt="product"
                      />
                      Headphone JBL
                    </a>
                  </div>
                  <div class="search-header">Projects</div>
                  <div class="search-item">
                    <a
                      href="https://themeforest.net/item/epice-laravel-admin-template-for-hr-project-management/24466729"
                      target="_black"
                    >
                      <div class="search-icon bg-danger text-white mr-3">
                        <i class="fas fa-code"></i>
                      </div>
                      Epice Laravel - Admin Template
                    </a>
                  </div>
                  <div class="search-item">
                    <a
                      href="https://themeforest.net/item/soccer-project-management-admin-template-ui-kit/24646866"
                      target="_black"
                    >
                      <div class="search-icon bg-primary text-white mr-3">
                        <i class="fas fa-laptop"></i>
                      </div>
                      Soccer - Admin Template
                    </a>
                  </div>
                </div>
              </div>
            </form>
            <ul class="navbar-nav navbar-right">
              <li class="dropdown">
                <a
                  href="#"
                  data-toggle="dropdown"
                  class="nav-link dropdown-toggle nav-link-lg nav-link-user"
                >
                  <img
                    alt="image"
                    src="assets/img/avatar/avatar-1.png"
                    class="rounded-circle mr-1"
                  />
                  <div class="d-sm-none d-lg-inline-block">Hi, Admin </div>
                </a>
                {/* <div class="dropdown-menu dropdown-menu-right">
                        <div class="dropdown-title">Logged in 5 min ago</div>
                        <a href="features-profile.html" class="dropdown-item has-icon"><i class="far fa-user"></i> Profile</a>
                        <a href="features-activities.html" class="dropdown-item has-icon"><i class="fas fa-bolt"></i> Activities</a>
                        <a href="features-settings.html" class="dropdown-item has-icon"><i class="fas fa-cog"></i> Settings</a>
                        <div class="dropdown-divider"></div>
                        <a href="#" class="dropdown-item has-icon text-danger"><i class="fas fa-sign-out-alt"></i> Logout</a>
                    </div> */}
              </li>
            </ul>
          </nav>

          <PGNav />

          <div class="main-content">
            <section class="section">
              <div class="section-header">
                <h1>Editor</h1>
                <div class="section-header-breadcrumb">
                  <div class="breadcrumb-item active">
                    <a href="#">Dashboard</a>
                  </div>
                  <div class="breadcrumb-item">
                    <a href="#">Forms</a>
                  </div>
                  <div class="breadcrumb-item">Editor</div>
                </div>
              </div>

              <div class="section-body">
                {/* <div class="row">
                        <div class="col-12">
                            <div class="card">
                                <div class="card-header">
                                    <h4>Simple Summernote</h4>
                                </div>
                                <div class="card-body">
                                    <div class="form-group row mb-4">
                                        <label class="col-form-label text-md-right col-12 col-md-3 col-lg-3">Title</label>
                                        <div class="col-sm-12 col-md-7">
                                            <input type="text" class="form-control"/>
                                        </div>
                                    </div>
                                    <div class="form-group row mb-4">
                                        <label class="col-form-label text-md-right col-12 col-md-3 col-lg-3">Category</label>
                                        <div class="col-sm-12 col-md-7">
                                            <select class="form-control selectric">
                                                <option>Tech</option>
                                                <option>News</option>
                                                <option>Political</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group row mb-4">
                                        <label class="col-form-label text-md-right col-12 col-md-3 col-lg-3">Content</label>
                                        <div class="col-sm-12 col-md-7">
                                            <textarea class="summernote-simple"></textarea>
                                        </div>
                                    </div>
                                    <div class="form-group row mb-4">
                                        <label class="col-form-label text-md-right col-12 col-md-3 col-lg-3"></label>
                                        <div class="col-sm-12 col-md-7">
                                            <button class="btn btn-primary">Publish</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> */}

                <div class="row">
                  <div class="col-12">
                    <div class="card">
                      <div class="card-header">
                        <h4> All Post </h4>
                      </div>
                      <form onSubmit={handleSubmit(addContent)}>
                        <div class="card-body">
                          <div class="form-group row mb-4">
                            <label class="col-form-label text-md-right col-12 col-md-3 col-lg-3">
                              Title
                            </label>
                            <div class="col-sm-12 col-md-7">
                              <input type="text" class="form-control" {...register("title")} />
                            </div>
                          </div>
                          <div class="form-group row mb-4">
                            <label class="col-form-label text-md-right col-12 col-md-3 col-lg-3">
                              Category
                            </label>
                            <div class="col-sm-12 col-md-7" {...register("category")} >
                              <select class="form-control selectric" >
                                <option>News</option>
                                <option>Blog</option>
                                <option>TimeTable</option>
                              </select>
                            </div>
                          </div>
                          <div class="form-group row mb-4">
                            <label class="col-form-label text-md-right col-12 col-md-3 col-lg-3">
                              Content
                            </label>
                            <div class="col-sm-12 col-md-7">
                
                              <textarea class="summernote" {...register("msg")} ></textarea>
                            </div>
                          </div>
                          <div class="form-group row mb-4">
                            <label class="col-form-label text-md-right col-12 col-md-3 col-lg-3"></label>
                            <div class="col-sm-12 col-md-7">
                              <button class="btn btn-primary w-100" type="submit">
                                Publish
                              </button>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <footer class="main-footer">
            <div class="footer-left">
              <div class="bullet"></div>
              <a hrefs="templateshub.net">CSC UNICAL PG 2021 </a>
            </div>
            <div class="footer-right"></div>
          </footer>
        </div>
      </div>
    </>
  );
};

export default Editor;
