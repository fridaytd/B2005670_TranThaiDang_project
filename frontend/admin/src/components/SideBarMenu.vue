<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
    <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
        <div class="position-sticky pt-3 sidebar-sticky">
            <ul class="nav flex-column">
                <li class="nav-item" style="color: #0C713D">
                    <router-link class="nav-link active" style="color: #0C713D" aria-current="page" to="/profile">
                        <span data-feather="home" class="align-text-bottom"></span>
                        Profile
                    </router-link>
                </li>
                <li class="nav-item" style="color: #0C713D">
                    <router-link class="nav-link" style="color: #0C713D" to="/orders">
                        <span data-feather="file" class="align-text-bottom"></span>
                        Orders
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" style="color: #0C713D" to="/products">
                        <span data-feather="shopping-cart" class="align-text-bottom"></span>
                        Products
                    </router-link>
                </li>
                <!-- 
                        <li class="nav-item">
                            <a class="nav-link" href="#">
                                <span data-feather="users" class="align-text-bottom"></span>
                                Customers
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">
                                <span data-feather="bar-chart-2" class="align-text-bottom"></span>
                                Reports
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">
                                <span data-feather="layers" class="align-text-bottom"></span>
                                Integrations
                            </a>
                        </li> -->
            </ul>

        </div>
    </nav>
</template>