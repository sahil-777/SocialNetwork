[1mdiff --git a/views/homeView.ejs b/views/homeView.ejs[m
[1mindex 4137acd..3eeb76b 100644[m
[1m--- a/views/homeView.ejs[m
[1m+++ b/views/homeView.ejs[m
[36m@@ -10,6 +10,9 @@[m
     <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>[m
 [m
 <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>[m
[32m+[m[32m<script src="http://code.jquery.com/jquery-1.10.2.min.js"></script>[m
[32m+[m[32m<script src="http://netdna.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>[m
[32m+[m[32m<script src="https://use.fontawesome.com/cb2d0db4c2.js"></script>[m
 <script  type="text/javascript" src="../JS/typeahead.min.js"></script>[m
 <script type="text/javascript">[m
         $(document).ready(function(){[m
[36m@@ -100,24 +103,48 @@[m
      [m
 [m
 </script>[m
[32m+[m[32m<style type="text/css">[m
[32m+[m[32mbody {[m
[32m+[m[32m  padding-top: 20px;[m
[32m+[m[32m  padding-bottom: 20px;[m
[32m+[m[32m}[m
[32m+[m[32m</style>[m
 </head>[m
[31m-<body>[m
[31m-    HomePage![m
[31m-    <form id="homeForm" action="/login" method="GET">[m
[31m-        <input type="submit" value="Logout">  [m
[31m-    </form>[m
[31m-    <br>[m
[31m-    <form id="homeForm" action="/profile" method="GET">[m
[31m-        <input type="submit" value="Profile">[m
[31m-    </form>[m
[31m-    <br><br>[m
[31m-    [m
[31m-    <input type="text" id="search-text" class="typeahead tt-query" name="typeahead" autocomplete="off" spellcheck="false" placeholder="Type username">[m
[31m-    <br><br><br>[m
[31m-    <form id="search-user-form" method="GET" action="" >[m
[31m-        <input type="submit" name="searchUser" id="search-user" value="search"> [m
[31m-    </form>[m
 [m
[32m+[m[32m<header>[m
[32m+[m[32m    <div class="container">[m
[32m+[m[32m    <nav class="navbar navbar-default navbar-fixed-top navbar-light">[m
[32m+[m[32m                    <div class="container">[m
[32m+[m[32m                        <!-- Brand and toggle get grouped for better mobile display -->[m
[32m+[m[32m                        <div class="navbar-header">[m
[32m+[m[32m                            <a class="navbar-brand" href="/">[m
[32m+[m[32m                                Social-Network-Logo[m
[32m+[m[32m                            </a>[m
[32m+[m[32m                        </div>[m[41m [m
[32m+[m[32m                        <!-- Search Navbar -->[m
[32m+[m[32m                        <form method="GET" action="" id="search-user-form" class="navbar-form navbar-left search-container hidden-xs" role="search" >[m
[32m+[m[32m                            <div class="form-group">[m
[32m+[m[32m                                <input type="search" id="search-text" class="typeahead tt-query" name="typeahead" autocomplete="off" spellcheck="false" placeholder="Type username">[m
[32m+[m[32m                            </div>[m
[32m+[m[32m                            <input type="submit" class="btn btn-default btn-search" value="Search" name="searchUser" id="search-user">[m
[32m+[m[32m                        </form>[m
[32m+[m[32m                        <!--END Search navbar -->[m
[32m+[m[32m                        <div class="collapse navbar-collapse navbar-right" id="bs-example-navbar-collapse-1">[m
[32m+[m[32m                            <ul class="nav navbar-nav navbar-left">[m
[32m+[m[32m                                <li class="active"><a href="/">Home</a></li>[m
[32m+[m[32m                                <li><a href="/profile">Profile</a></li>[m
[32m+[m[32m                                <li><a href="/login">Logout</a></li>[m
[32m+[m[32m                            </ul>[m
[32m+[m[32m                        </div>[m
[32m+[m[32m                        <!-- /.navbar-collxapse -->[m
[32m+[m[32m                    </div>[m
[32m+[m[32m                    <!-- /.container-fluid -->[m
[32m+[m[32m                </nav>[m
[32m+[m[41m                 [m
[32m+[m[32m    </div>[m
[32m+[m[32m</header>[m
[32m+[m[32m<body>[m
[32m+[m[32m<br><br><br>[m
     <div id="load-feed">[m
         <% for(var i=0; i < feedResult.length; i++) { %>[m
             <label onclick="showAccount('<%=feedResult[i].username%>')"><%=feedResult[i].username%></label><br>[m
