import './app-bar-search'
import './jwt'
import mock from './mock'
import './pages/datatable'
import './pages/profile'


// Apps
import './apps/chat'
import './apps/email'
import './apps/invoice'
import './apps/permissions'

// Dashboard
import './dashboard/analytics'

//pages
import './pages/monografias'
import './pages/obras'
import './pages/utilizadores'

//pages // pages
import './pages/faq'
import './pages/ajuda'

// forwards the matched request over network
mock.onAny().passThrough()
