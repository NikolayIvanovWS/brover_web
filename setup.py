from setuptools import find_packages, setup
from glob import glob
import os

package_name = 'brover_web'

setup(
    name=package_name,
    version='0.0.0',
    packages=find_packages(exclude=['test']),
    data_files=[
        ('share/' + package_name, ['package.xml']),
        ('share/' + package_name + '/launch', glob('launch/*.xml')),
    ],
    install_requires=['setuptools', 'flask'],
    include_package_data=True,
    zip_safe=False,
    maintainer='pi',
    maintainer_email='cola@cactus.ru',
    description='Web server for brover platform',
    license='TODO: License declaration',
    tests_require=['pytest'],
    entry_points={
        'console_scripts': [
            'web_server = brover_web.web_server:main'
        ],
    },
)
