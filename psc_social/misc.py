def check_session(**kwargs):
    if 'key' not in kwargs:
        kwargs['key'] = 'login'
    return kwargs['key'] in kwargs['session']