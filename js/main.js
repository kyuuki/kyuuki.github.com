$(document).ready(function(){
    $("body").css("visibility", "visible");
});

$(function(){
    $.ajax({
        type: 'GET',
        url: 'https://api.github.com/users/kyuuki/repos',
        cache: false,
        dataType: 'jsonp',
        success: function(data) {
            var datas, i, l, repoElement, reposElement, desc;
            datas = data.data;
            reposElement = $('#repositories ul');
            for (i = 0, l = datas.length; i < l; i++) {
                data = datas[i];
                repoElement = $('<li><a class="url"></a><span class="desc" /></li>');
                repoElement.find('a').attr('href', data.html_url).html(data.name);
                desc = (data.description || '').slice(0, 20);
                if (desc != (data.description || '')) {
                    desc += '...';
                }
                if (data.description) {
                    repoElement.find('.desc').before(" - ");
                }
                repoElement.find('.desc').text(desc);
                if (data.fork) {
                    repoElement.addClass('fork');
                }

                if (data.language) {
                    repoElement.addClass('lang-' + data.language.toLowerCase());
                }

                reposElement.append(repoElement);
            }
        }
    });
});